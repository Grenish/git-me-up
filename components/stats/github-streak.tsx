interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalContributions: number;
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

export function generateStreakCard(
  username: string,
  streak: StreakData,
  theme: "dark" | "light" = "dark",
  fontFamily: string = "Montserrat",
) {
  const t = themeTokens(theme);

  const currentStr = formatNumber(streak.currentStreak);
  const longestStr = formatNumber(streak.longestStreak);
  const totalStr = formatNumber(streak.totalContributions);

  return {
    type: "div",
    props: {
      style: {
        width: "495px",
        backgroundColor: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        fontFamily: `${fontFamily}, -apple-system, system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif`,
      },
      children: [
        // Streak Label
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
            children: "Streak",
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
              justifyContent: "space-between",
              gap: "12px",
            },
            children: [
              // Current
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
                        children: "Current",
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
                        children: currentStr,
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
                        children: "days",
                      },
                    },
                  ],
                },
              },

              // Total
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
                        children: "Total",
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
                        children: totalStr,
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
                        children: "contributions",
                      },
                    },
                  ],
                },
              },

              // Longest
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
                        children: "Longest",
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
                        children: longestStr,
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
                        children: "days",
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
