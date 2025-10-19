import { NextRequest } from "next/server";
import satori from "satori";
import fs from "fs";
import path from "path";
import { generateStatsCard } from "@/components/stats/github-stats";
import { generateStreakCard } from "@/components/stats/github-streak";

export const runtime = "nodejs";

// -------------------- Types --------------------
interface GitHubStats {
  totalStars: number;
  publicRepos: number;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
}

interface GitHubRepo {
  stargazers_count: number;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
}

// -------------------- Font loading --------------------
function getFonts(fontType: "montserrat" | "doto" = "montserrat") {
  const fontFileName =
    fontType === "doto" ? "Doto-SemiBold.ttf" : "Montserrat-Regular.ttf";
  const fontFamily = fontType === "doto" ? "Doto Rounded" : "Montserrat";

  const fontPath = path.join(process.cwd(), "public", "fonts", fontFileName);
  const fontData = fs.readFileSync(fontPath);

  return [
    {
      name: fontFamily,
      data: new Uint8Array(fontData).buffer,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: fontFamily,
      data: new Uint8Array(fontData).buffer,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}

// -------------------- GitHub Fetchers --------------------
async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "minimal-github-stats-card",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );
    if (!userResponse.ok)
      throw new Error(`GitHub API error: ${userResponse.status}`);

    const userData = await userResponse.json();

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
      { headers, next: { revalidate: 3600 } },
    );

    const repos: GitHubRepo[] = reposResponse.ok
      ? await reposResponse.json()
      : [];
    const totalStars = repos.reduce(
      (acc: number, repo: GitHubRepo) => acc + (repo.stargazers_count || 0),
      0,
    );

    const publicRepos = userData.public_repos || 0;

    return { totalStars, publicRepos };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { totalStars: 0, publicRepos: 0 };
  }
}

async function calculateStreak(username: string): Promise<StreakData> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "minimal-github-stats-card",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // First, get the user's account creation date
    const userQuery = `
      query($username: String!) {
        user(login: $username) {
          createdAt
        }
      }
    `;

    const userResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: userQuery,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!userResponse.ok) {
      throw new Error(`GitHub GraphQL API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    if (userData.errors) {
      console.error("GraphQL errors:", userData.errors);
      return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
    }

    const createdAt = new Date(userData.data.user.createdAt);
    const currentDate = new Date();

    // Query contributions year by year from account creation to now
    const allContributionDays: ContributionDay[] = [];
    let totalContributions = 0;

    // Calculate years to query
    const startYear = createdAt.getFullYear();
    const currentYear = currentDate.getFullYear();

    for (let year = startYear; year <= currentYear; year++) {
      const fromDate =
        year === startYear
          ? createdAt.toISOString()
          : `${year}-01-01T00:00:00Z`;

      const toDate =
        year === currentYear
          ? currentDate.toISOString()
          : `${year}-12-31T23:59:59Z`;

      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers,
        body: JSON.stringify({
          query,
          variables: {
            username,
            from: fromDate,
            to: toDate,
          },
        }),
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        console.error(`Failed to fetch year ${year}`);
        continue;
      }

      const data = await response.json();
      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        continue;
      }

      const calendar: ContributionCalendar =
        data.data.user.contributionsCollection.contributionCalendar;

      totalContributions += calendar.totalContributions;

      // Extract contribution days
      for (const week of calendar.weeks) {
        for (const day of week.contributionDays) {
          if (day.contributionCount > 0) {
            allContributionDays.push(day);
          }
        }
      }
    }

    if (allContributionDays.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
    }

    // Sort by date
    allContributionDays.sort((a, b) => a.date.localeCompare(b.date));

    // Helper function to get date string
    const getDateString = (date: Date): string => {
      return date.toISOString().split("T")[0];
    };

    // Calculate current streak
    let currentStreak = 0;
    const now = new Date();
    const todayStr = getDateString(now);
    const yesterdayStr = getDateString(
      new Date(now.getTime() - 24 * 60 * 60 * 1000),
    );

    // Create a set of contribution dates for easy lookup
    const contributionDates = new Set(
      allContributionDays.map((day) => day.date),
    );

    // Check if there's activity today or yesterday to start counting
    if (contributionDates.has(todayStr)) {
      currentStreak = 1;
      const checkDate = new Date(now);
      checkDate.setDate(checkDate.getDate() - 1);

      // Walk backwards from yesterday
      while (contributionDates.has(getDateString(checkDate))) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else if (contributionDates.has(yesterdayStr)) {
      currentStreak = 1;
      const checkDate = new Date(now);
      checkDate.setDate(checkDate.getDate() - 2);

      // Walk backwards from 2 days ago
      while (contributionDates.has(getDateString(checkDate))) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 1; i < allContributionDays.length; i++) {
      const prevDate = new Date(allContributionDays[i - 1].date);
      const currDate = new Date(allContributionDays[i].date);

      // Calculate difference in days
      const diffTime = currDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffTime / (24 * 60 * 60 * 1000));

      if (diffDays === 1) {
        // Consecutive day
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        // Streak broken
        tempStreak = 1;
      }
    }

    // Make sure to check the final streak and current streak
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    return {
      currentStreak,
      longestStreak,
      totalContributions,
    };
  } catch (error) {
    console.error("Error calculating streak:", error);
    return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
  }
}

// -------------------- Route --------------------
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");
    const theme = (searchParams.get("theme") as "dark" | "light") || "dark";
    const type = searchParams.get("type") || "stats";
    const font =
      (searchParams.get("font") as "montserrat" | "doto") || "montserrat";

    if (!username) {
      return new Response("Username parameter is required", { status: 400 });
    }

    const fonts = getFonts(font);
    const fontFamily = font === "doto" ? "Doto Rounded" : "Montserrat";

    let svg: string;

    if (type === "streak") {
      const streak = await calculateStreak(username);
      svg = await satori(
        generateStreakCard(
          username,
          streak,
          theme,
          fontFamily,
        ) as unknown as React.ReactElement,
        {
          width: 495,
          height: 195,
          fonts,
        },
      );
    } else {
      const stats = await fetchGitHubStats(username);
      svg = await satori(
        generateStatsCard(
          username,
          stats,
          theme,
          fontFamily,
        ) as unknown as React.ReactElement,
        {
          width: 495,
          height: 195,
          fonts,
        },
      );
    }

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating GitHub stats:", error);
    return new Response("Error generating stats", { status: 500 });
  }
}
