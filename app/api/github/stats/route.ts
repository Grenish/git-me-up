// app/api/github/stats/route.ts
import { NextRequest } from "next/server";
import satori from "satori";
import fs from "fs";
import path from "path";

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

interface GitHubEvent {
  created_at: string;
}

// -------------------- Font loading --------------------
// Use local fonts from public/fonts directory
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
    // Use same font for bold weight (will be rendered bold by Satori)
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
    Accept: "application/vnd.github+json",
    "User-Agent": "minimal-github-stats-card",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { headers, next: { revalidate: 3600 } },
    );

    if (!eventsResponse.ok) {
      return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
    }

    const events: GitHubEvent[] = await eventsResponse.json();

    // Group events by date (UTC day)
    const contributionsByDate = new Map<string, number>();
    for (const event of events) {
      const date = new Date(event.created_at).toISOString().split("T")[0];
      contributionsByDate.set(date, (contributionsByDate.get(date) || 0) + 1);
    }

    const dates = Array.from(contributionsByDate.keys()).sort();
    if (dates.length === 0) {
      return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
    }

    const hasDate = (dateStr: string) => contributionsByDate.has(dateStr);
    const toISODate = (d: Date) => d.toISOString().split("T")[0];

    // Current streak: walk backwards from today/yesterday
    let currentStreak = 0;
    const today = new Date();
    const yesterday = new Date(Date.now() - 86400000);

    const cursor: Date | null = hasDate(toISODate(today))
      ? new Date(today)
      : hasDate(toISODate(yesterday))
        ? new Date(yesterday)
        : null;

    if (cursor) {
      currentStreak = 1;
      let currentCursor: Date | null = cursor;
      while (currentCursor) {
        const prevDate: Date = new Date(currentCursor.getTime() - 86400000);
        if (hasDate(toISODate(prevDate))) {
          currentStreak++;
          currentCursor = prevDate;
        } else {
          break;
        }
      }
    }

    // Longest streak across sorted dates
    let longestStreak = 1;
    let temp = 1;
    for (let i = 1; i < dates.length; i++) {
      const prevDate = new Date(dates[i - 1]);
      const currDate = new Date(dates[i]);
      const diffDays = Math.floor(
        (currDate.getTime() - prevDate.getTime()) / 86400000,
      );
      if (diffDays === 1) {
        temp++;
      } else {
        if (temp > longestStreak) longestStreak = temp;
        temp = 1;
      }
    }
    longestStreak = Math.max(longestStreak, temp, currentStreak);

    const totalContributions = Array.from(contributionsByDate.values()).reduce(
      (a, b) => a + b,
      0,
    );

    return { currentStreak, longestStreak, totalContributions };
  } catch (error) {
    console.error("Error calculating streak:", error);
    return { currentStreak: 0, longestStreak: 0, totalContributions: 0 };
  }
}

// -------------------- Design helpers --------------------
function themeTokens(theme: "dark" | "light") {
  const isDark = theme === "dark";
  return {
    bg: isDark ? "#0D1117" : "#FFFFFF",
    text: isDark ? "#E6EDF3" : "#0A0A0A",
    muted: isDark ? "#9BA5B1" : "#6B7280",
    border: isDark ? "#1F232A" : "#E5E7EB",
    accent: isDark ? "#7AA2F7" : "#2563EB",
    subtle: isDark ? "#11161C" : "#F8FAFC",
  };
}

function number(n: number) {
  try {
    return n.toLocaleString();
  } catch {
    return String(n);
  }
}

// -------------------- Card generators (minimal design) --------------------
function generateStatsCard(
  username: string,
  stats: GitHubStats,
  theme: "dark" | "light" = "dark",
  fontFamily: string = "Montserrat",
) {
  const t = themeTokens(theme);

  const starsStr = number(stats.totalStars);
  const reposStr = number(stats.publicRepos);

  return {
    type: "div",
    props: {
      style: {
        width: "495px",
        height: "195px",
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${fontFamily}, -apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
      },
      children: [
        // Header
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: t.text,
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "0.2px",
                  },
                  children: `${username}`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: t.muted,
                    fontSize: "12px",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    backgroundColor: t.subtle,
                    border: `1px solid ${t.border}`,
                  },
                  children: "GitHub Stats",
                },
              },
            ],
          },
        },

        // Divider
        {
          type: "div",
          props: {
            style: {
              height: "1px",
              backgroundColor: t.border,
              marginBottom: "12px",
            },
          },
        },

        // Metrics Row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              gap: "24px",
              flex: 1,
              alignItems: "center",
            },
            children: [
              // Stars
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "12px",
                          marginBottom: "6px",
                        },
                        children: "Total Stars",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.accent,
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: "1.1",
                        },
                        children: starsStr,
                      },
                    },
                  ],
                },
              },

              // Subtle vertical divider
              {
                type: "div",
                props: {
                  style: {
                    width: "1px",
                    height: "48px",
                    backgroundColor: t.border,
                  },
                },
              },

              // Public Repos
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "12px",
                          marginBottom: "6px",
                        },
                        children: "Public Repositories",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.text,
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: "1.1",
                        },
                        children: reposStr,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // Footer (muted, optional)
        {
          type: "div",
          props: {
            style: {
              marginTop: "auto",
              color: t.muted,
              fontSize: "11px",
            },
            children: "Data via GitHub API • Cached 1h",
          },
        },
      ],
    },
  };
}

function generateStreakCard(
  username: string,
  streak: StreakData,
  theme: "dark" | "light" = "dark",
  fontFamily: string = "Montserrat",
) {
  const t = themeTokens(theme);

  const currentStr = number(streak.currentStreak);
  const longestStr = number(streak.longestStreak);
  const totalStr = number(streak.totalContributions);

  return {
    type: "div",
    props: {
      style: {
        width: "495px",
        height: "195px",
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "12px",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${fontFamily}, -apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
      },
      children: [
        // Header
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: t.text,
                    fontSize: "16px",
                    fontWeight: 700,
                    letterSpacing: "0.2px",
                  },
                  children: `${username}`,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: t.muted,
                    fontSize: "12px",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                    backgroundColor: t.subtle,
                    border: `1px solid ${t.border}`,
                  },
                  children: "Contribution Streak",
                },
              },
            ],
          },
        },

        // Divider
        {
          type: "div",
          props: {
            style: {
              height: "1px",
              backgroundColor: t.border,
              marginBottom: "12px",
            },
          },
        },

        // Metrics Row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
            },
            children: [
              // Current
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "12px",
                          marginBottom: "6px",
                        },
                        children: "Current Streak",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.text,
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: "1.1",
                        },
                        children: `${currentStr} days`,
                      },
                    },
                  ],
                },
              },
              // Divider
              {
                type: "div",
                props: {
                  style: {
                    width: "1px",
                    height: "48px",
                    backgroundColor: t.border,
                  },
                },
              },
              // Longest
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "12px",
                          marginBottom: "6px",
                        },
                        children: "Longest Streak",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.accent,
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: "1.1",
                        },
                        children: `${longestStr} days`,
                      },
                    },
                  ],
                },
              },
              // Divider
              {
                type: "div",
                props: {
                  style: {
                    width: "1px",
                    height: "48px",
                    backgroundColor: t.border,
                  },
                },
              },
              // Total
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "12px",
                          marginBottom: "6px",
                        },
                        children: "Total Contributions",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.text,
                          fontSize: "28px",
                          fontWeight: 700,
                          lineHeight: "1.1",
                        },
                        children: totalStr,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // Footer (muted, optional)
        {
          type: "div",
          props: {
            style: { marginTop: "auto", color: t.muted, fontSize: "11px" },
            children: "Based on recent public events • Cached 1h",
          },
        },
      ],
    },
  };
}

// -------------------- Route --------------------
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username");
    const theme = (searchParams.get("theme") as "dark" | "light") || "dark";
    const type = searchParams.get("type") || "stats"; // 'stats' or 'streak'
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
