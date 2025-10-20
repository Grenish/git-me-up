interface LanguageData {
  name: string;
  percentage: number;
  color: string;
  logoUrl: string;
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

function formatPercentage(n: number): string {
  return n.toFixed(1);
}

export function generateTopLangCard(
  username: string,
  languages: LanguageData[],
  theme: "dark" | "light" = "dark",
  fontFamily: string = "Montserrat",
  _baseUrl: string = "",
) {
  const t = themeTokens(theme);

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
        // Top Languages Label
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
            children: "Top Languages",
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

        // Languages Row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
            },
            children: languages.map((lang, index) => ({
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                },
                children: [
                  // Language Logo
                  {
                    type: "div",
                    props: {
                      style: {
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "12px",
                        backgroundColor: t.subtle,
                        borderRadius: "8px",
                        border: `1px solid ${t.border}`,
                      },
                      children: lang.logoUrl
                        ? {
                            type: "img",
                            props: {
                              src: lang.logoUrl,
                              width: 32,
                              height: 32,
                              style: {
                                objectFit: "contain",
                              },
                            },
                          }
                        : {
                            type: "div",
                            props: {
                              style: {
                                width: "32px",
                                height: "32px",
                                backgroundColor: lang.color,
                                borderRadius: "50%",
                              },
                            },
                          },
                    },
                  },

                  // Language Name
                  {
                    type: "div",
                    props: {
                      style: {
                        color: index === 0 ? t.accent : t.text,
                        fontSize: "14px",
                        fontWeight: 600,
                        marginBottom: "6px",
                        textAlign: "center",
                      },
                      children: lang.name,
                    },
                  },

                  // Percentage
                  {
                    type: "div",
                    props: {
                      style: {
                        color: index === 0 ? t.accent : t.muted,
                        fontSize: "20px",
                        fontWeight: 700,
                        lineHeight: "1",
                      },
                      children: `${formatPercentage(lang.percentage)}%`,
                    },
                  },

                  // Rank Badge (optional - only for first)
                  ...(index === 0
                    ? [
                        {
                          type: "div",
                          props: {
                            style: {
                              color: t.accent,
                              fontSize: "9px",
                              marginTop: "4px",
                              opacity: 0.7,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            },
                            children: "Most Used",
                          },
                        },
                      ]
                    : []),
                ],
              },
            })),
          },
        },
      ],
    },
  };
}
