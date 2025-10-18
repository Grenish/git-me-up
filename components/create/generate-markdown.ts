import type { GitHubUser } from "@/components/profile-card";
import { TechStack } from "@/lib/tech-stack";

interface SocialHandles {
  twitter: string;
  linkedin: string;
  website: string;
  email: string;
  youtube: string;
  buymeacoffee: string;
  instagram: string;
  facebook: string;
  twitch: string;
}

interface StatsConfig {
  font: "montserrat" | "doto";
  theme: "dark" | "light";
  includeStats: boolean;
  includeStreak: boolean;
}

interface GenerateMarkdownOptions {
  user: GitHubUser | null;
  headerImage: string | null;
  textareaValue: string;
  socialHandles: SocialHandles;
  selectedTech: string[];
  statsConfig?: StatsConfig;
}

export function generateMarkdown({
  user,
  headerImage,
  textareaValue,
  socialHandles,
  selectedTech,
  statsConfig,
}: GenerateMarkdownOptions): string {
  let markdown = "";

  // Add header image if exists
  if (headerImage) {
    markdown += `![Header](${headerImage})\n\n`;
  }

  // Add title with username
  markdown += `# Hi, I'm ${user?.name || user?.login} 👋\n\n`;

  // Add bio
  if (textareaValue) {
    markdown += `${textareaValue}\n\n`;
  }

  // Add social media links with minimal badges
  const hasSocials = Object.values(socialHandles).some(
    (handle) => handle.trim() !== "",
  );
  if (hasSocials) {
    const socials = [];

    if (socialHandles.twitter) {
      socials.push(
        `[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://twitter.com/${socialHandles.twitter})`,
      );
    }
    if (socialHandles.linkedin) {
      socials.push(
        `[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/${socialHandles.linkedin})`,
      );
    }
    if (socialHandles.youtube) {
      socials.push(
        `[![YouTube](https://img.shields.io/badge/-YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@${socialHandles.youtube})`,
      );
    }
    if (socialHandles.instagram) {
      socials.push(
        `[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/${socialHandles.instagram})`,
      );
    }
    if (socialHandles.facebook) {
      socials.push(
        `[![Facebook](https://img.shields.io/badge/-Facebook-1877F2?style=flat-square&logo=facebook&logoColor=white)](https://facebook.com/${socialHandles.facebook})`,
      );
    }
    if (socialHandles.twitch) {
      socials.push(
        `[![Twitch](https://img.shields.io/badge/-Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white)](https://twitch.tv/${socialHandles.twitch})`,
      );
    }
    if (socialHandles.website) {
      socials.push(
        `[![Website](https://img.shields.io/badge/-Website-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](${socialHandles.website.startsWith("http") ? socialHandles.website : "https://" + socialHandles.website})`,
      );
    }
    if (socialHandles.email) {
      socials.push(
        `[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:${socialHandles.email})`,
      );
    }

    markdown += `${socials.join(" ")}\n\n`;
  }

  // Add tech stack with logos inline
  if (selectedTech.length > 0) {
    markdown += `## 🛠️ Tech Stack\n\n`;

    const techDetails = TechStack.filter((tech) =>
      selectedTech.includes(tech.name),
    );

    markdown += `<p>\n`;
    techDetails.forEach((tech) => {
      markdown += `  <img src="${process.env.NEXT_PUBLIC_URL}${tech.logoPath}" alt="${tech.name}" width="40" height="40"/>\n`;
    });
    markdown += `</p>\n\n`;
  }

  // Add GitHub stats based on configuration
  if (
    user &&
    statsConfig &&
    (statsConfig.includeStats || statsConfig.includeStreak)
  ) {
    const baseUrl =
      process.env.NEXT_PUBLIC_URL || "https://git-me-up.vercel.app";
    const theme = statsConfig.theme || "dark";
    const font = statsConfig.font || "montserrat";

    markdown += `## 📊 GitHub Stats\n\n`;
    markdown += `<div align="center">\n\n`;

    if (statsConfig.includeStats) {
      const statsUrl = `${baseUrl}/api/github/stats?username=${user.login}&theme=${theme}&type=stats&font=${font}`;
      markdown += `![GitHub Stats](${statsUrl})\n\n`;
    }

    if (statsConfig.includeStreak) {
      const streakUrl = `${baseUrl}/api/github/stats?username=${user.login}&theme=${theme}&type=streak&font=${font}`;
      markdown += `![GitHub Streak](${streakUrl})\n\n`;
    }

    markdown += `</div>\n\n`;
  }

  markdown += `---\n\n`;
  markdown += `<div align="center">\n\n`;
  markdown += `**[${user?.login}](${user?.html_url})** • Made with ❤️\n\n`;
  markdown += `</div>`;

  return markdown;
}
