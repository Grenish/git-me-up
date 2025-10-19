interface GitHubStats {
  totalStars: number;
  publicRepos: number;
}

interface ThemeTokens {
  bg: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  subtle: string;
}

function themeTokens(theme: "dark" | "light"): ThemeTokens {
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

function formatNumber(n: number): string {
  try {
    return n.toLocaleString();
  } catch {
    return String(n);
  }
}

export function generateStatsCard(
  username: string,
  stats: GitHubStats,
  theme: "dark" | "light" = "dark",
  fontFamily: string = "Montserrat",
) {
  const t = themeTokens(theme);

  const starsStr = formatNumber(stats.totalStars);
  const reposStr = formatNumber(stats.publicRepos);

  return {
    type: "div",
    props: {
      style: {
        width: "320px",
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${fontFamily}, -apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
      },
      children: [
        // Stats Label
        {
          type: "div",
          props: {
            style: {
              color: t.muted,
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "4px",
            },
            children: "Stats",
          },
        },

        // Username
        {
          type: "div",
          props: {
            style: {
              color: t.text,
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "16px",
            },
            children: username,
          },
        },

        // Divider
        {
          type: "div",
          props: {
            style: {
              height: "1px",
              backgroundColor: t.border,
              marginBottom: "16px",
            },
          },
        },

        // Metrics Row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-around",
              gap: "16px",
            },
            children: [
              // Total Stars
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.accent,
                          fontSize: "11px",
                          fontWeight: 500,
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.3px",
                        },
                        children: "Stars",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.accent,
                          fontSize: "24px",
                          fontWeight: 700,
                          lineHeight: "1",
                        },
                        children: starsStr,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.accent,
                          fontSize: "10px",
                          marginTop: "4px",
                          opacity: 0.7,
                        },
                        children: "total",
                      },
                    },
                  ],
                },
              },

              // Public Repos
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "11px",
                          fontWeight: 500,
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.3px",
                        },
                        children: "Repos",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.text,
                          fontSize: "24px",
                          fontWeight: 700,
                          lineHeight: "1",
                        },
                        children: reposStr,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          color: t.muted,
                          fontSize: "10px",
                          marginTop: "4px",
                        },
                        children: "public",
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}
