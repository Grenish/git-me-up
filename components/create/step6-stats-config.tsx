"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";

export interface StatsConfig {
  font: "montserrat" | "doto";
  theme: "dark" | "light";
  includeStats: boolean;
  includeStreak: boolean;
  includeTopLang: boolean;
}

interface Step6StatsConfigProps {
  username: string;
  statsConfig: StatsConfig;
  onStatsConfigChange: (config: StatsConfig) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Step6StatsConfig({
  username,
  statsConfig,
  onStatsConfigChange,
  onPrev,
  onNext,
}: Step6StatsConfigProps) {
  const [imageErrors, setImageErrors] = useState<{
    stats: boolean;
    streak: boolean;
    topLang: boolean;
  }>({
    stats: false,
    streak: false,
    topLang: false,
  });

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const statsUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${statsConfig.theme}&type=stats`;
  const streakUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${statsConfig.theme}&type=streak`;
  const topLangUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${statsConfig.theme}&type=top-lang`;

  const handleFontChange = (font: "montserrat" | "doto") => {
    onStatsConfigChange({ ...statsConfig, font });
  };

  const handleThemeChange = (theme: "dark" | "light") => {
    onStatsConfigChange({ ...statsConfig, theme });
    setImageErrors({ stats: false, streak: false, topLang: false });
  };

  const handleStatsToggle = () => {
    onStatsConfigChange({
      ...statsConfig,
      includeStats: !statsConfig.includeStats,
    });
  };

  const handleStreakToggle = () => {
    onStatsConfigChange({
      ...statsConfig,
      includeStreak: !statsConfig.includeStreak,
    });
  };

  const handleTopLangToggle = () => {
    onStatsConfigChange({
      ...statsConfig,
      includeTopLang: !statsConfig.includeTopLang,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* Header */}
      <div className="w-11/12 md:w-2/3 lg:w-1/2 flex items-center justify-between mb-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onPrev}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Back</TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-semibold">GitHub Stats</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon-sm" onClick={onNext}>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-11/12 md:w-2/3 lg:w-1/2 space-y-5">
        {/* Configuration Panel */}
        <div className="rounded-xl border bg-card p-5 space-y-5">
          {/* Font & Theme Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Font Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Font
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={
                    statsConfig.font === "montserrat" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleFontChange("montserrat")}
                  className="flex-1 h-8 text-xs"
                >
                  Montserrat
                </Button>
                <Button
                  variant={statsConfig.font === "doto" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFontChange("doto")}
                  className="flex-1 h-8 text-xs"
                >
                  Doto
                </Button>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Theme
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={statsConfig.theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleThemeChange("dark")}
                  className="flex-1 h-8 text-xs"
                >
                  Dark
                </Button>
                <Button
                  variant={
                    statsConfig.theme === "light" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleThemeChange("light")}
                  className="flex-1 h-8 text-xs"
                >
                  Light
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Cards Selection */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Include Cards
            </Label>
            <div className="space-y-2">
              {/* Stats Card */}
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">Stats</p>
                  <p className="text-xs text-muted-foreground">Stars & repos</p>
                </div>
                <Switch
                  checked={statsConfig.includeStats}
                  onCheckedChange={handleStatsToggle}
                />
              </div>

              {/* Streak Card */}
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">Streak</p>
                  <p className="text-xs text-muted-foreground">
                    Contribution streaks
                  </p>
                </div>
                <Switch
                  checked={statsConfig.includeStreak}
                  onCheckedChange={handleStreakToggle}
                />
              </div>

              {/* Top Languages Card */}
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">Top Languages</p>
                  <p className="text-xs text-muted-foreground">
                    Most used languages
                  </p>
                </div>
                <Switch
                  checked={statsConfig.includeTopLang}
                  onCheckedChange={handleTopLangToggle}
                />
              </div>
            </div>

            {!statsConfig.includeStats &&
              !statsConfig.includeStreak &&
              !statsConfig.includeTopLang && (
                <p className="text-xs text-amber-600 dark:text-amber-500 flex items-center gap-1 mt-2">
                  <span>⚠️</span>
                  <span>Select at least one card</span>
                </p>
              )}
          </div>
        </div>

        {/* Preview Section */}
        {(statsConfig.includeStats ||
          statsConfig.includeStreak ||
          statsConfig.includeTopLang) && (
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Preview
            </Label>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Stats Card Preview */}
              {statsConfig.includeStats && (
                <div className="relative">
                  {!imageErrors.stats ? (
                    <>
                      <Image
                        src={statsUrl}
                        alt={`${username}'s GitHub Stats`}
                        width={495}
                        height={195}
                        className="w-auto h-auto max-w-full rounded-xl relative z-10 shadow-sm"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, stats: true }))
                        }
                        unoptimized
                        key={statsUrl}
                      />
                    </>
                  ) : (
                    <div className="w-[495px] h-[195px] max-w-full rounded-xl border-2 border-dashed flex items-center justify-center bg-muted/20">
                      <p className="text-xs text-muted-foreground">
                        Preview unavailable
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Streak Card Preview */}
              {statsConfig.includeStreak && (
                <div className="relative">
                  {!imageErrors.streak ? (
                    <>
                      <Image
                        src={streakUrl}
                        alt={`${username}'s GitHub Streak`}
                        width={495}
                        height={195}
                        className="w-auto h-auto max-w-full rounded-xl relative z-10 shadow-sm"
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            streak: true,
                          }))
                        }
                        unoptimized
                        key={streakUrl}
                      />
                    </>
                  ) : (
                    <div className="w-[495px] h-[195px] max-w-full rounded-xl border-2 border-dashed flex items-center justify-center bg-muted/20">
                      <p className="text-xs text-muted-foreground">
                        Preview unavailable
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Top Languages Card Preview */}
              {statsConfig.includeTopLang && (
                <div className="relative">
                  {!imageErrors.topLang ? (
                    <>
                      <Image
                        src={topLangUrl}
                        alt={`${username}'s Top Languages`}
                        width={495}
                        height={195}
                        className="w-auto h-auto max-w-full rounded-xl relative z-10 shadow-sm"
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            topLang: true,
                          }))
                        }
                        unoptimized
                        key={topLangUrl}
                      />
                    </>
                  ) : (
                    <div className="w-[495px] h-[195px] max-w-full rounded-xl border-2 border-dashed flex items-center justify-center bg-muted/20">
                      <p className="text-xs text-muted-foreground">
                        Preview unavailable
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
