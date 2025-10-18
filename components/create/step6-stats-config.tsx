"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";
import { useState } from "react";

export interface StatsConfig {
  font: "montserrat" | "doto";
  theme: "dark" | "light";
  includeStats: boolean;
  includeStreak: boolean;
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
  }>({
    stats: false,
    streak: false,
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const statsUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${statsConfig.theme}&type=stats`;
  const streakUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${statsConfig.theme}&type=streak`;

  const handleFontChange = (font: "montserrat" | "doto") => {
    onStatsConfigChange({ ...statsConfig, font });
  };

  const handleThemeChange = (theme: "dark" | "light") => {
    onStatsConfigChange({ ...statsConfig, theme });
    // Reset image errors when theme changes
    setImageErrors({ stats: false, streak: false });
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

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-11/12 md:w-1/2 flex items-center justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon-sm"} onClick={onPrev}>
              <ArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Go Back</TooltipContent>
        </Tooltip>
        <h2 className="text-2xl font-semibold">GitHub Stats</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon-sm"} onClick={onNext}>
              <ArrowRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next Step</TooltipContent>
        </Tooltip>
      </div>

      <div className="w-11/12 md:w-1/2 mt-8 space-y-8">
        {/* Font Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Font Style</Label>
          <div className="flex gap-3">
            <Button
              variant={statsConfig.font === "montserrat" ? "default" : "outline"}
              size={"sm"}
              onClick={() => handleFontChange("montserrat")}
              className="flex-1"
            >
              Montserrat
            </Button>
            <Button
              variant={statsConfig.font === "doto" ? "default" : "outline"}
              size={"sm"}
              onClick={() => handleFontChange("doto")}
              className="flex-1"
            >
              Doto Rounded
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Choose your preferred font for the stats cards
          </p>
        </div>

        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Theme</Label>
          <div className="flex gap-3">
            <Button
              variant={statsConfig.theme === "dark" ? "default" : "outline"}
              size={"sm"}
              onClick={() => handleThemeChange("dark")}
              className="flex-1"
            >
              🌙 Dark
            </Button>
            <Button
              variant={statsConfig.theme === "light" ? "default" : "outline"}
              size={"sm"}
              onClick={() => handleThemeChange("light")}
              className="flex-1"
            >
              ☀️ Light
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Select the color scheme for your stats cards
          </p>
        </div>

        {/* Stats Cards Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Cards to Include</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex-1">
                <p className="text-sm font-medium">Stats Card</p>
                <p className="text-xs text-muted-foreground">
                  Shows total stars and public repositories
                </p>
              </div>
              <Toggle
                pressed={statsConfig.includeStats}
                onPressedChange={handleStatsToggle}
                aria-label="Toggle stats card"
              >
                {statsConfig.includeStats ? "Included" : "Excluded"}
              </Toggle>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex-1">
                <p className="text-sm font-medium">Streak Card</p>
                <p className="text-xs text-muted-foreground">
                  Displays contribution streaks and totals
                </p>
              </div>
              <Toggle
                pressed={statsConfig.includeStreak}
                onPressedChange={handleStreakToggle}
                aria-label="Toggle streak card"
              >
                {statsConfig.includeStreak ? "Included" : "Excluded"}
              </Toggle>
            </div>
          </div>
          {!statsConfig.includeStats && !statsConfig.includeStreak && (
            <p className="text-xs text-amber-600 dark:text-amber-500">
              ⚠️ At least one card should be selected for better profile visibility
            </p>
          )}
        </div>

        {/* Live Preview */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Live Preview</Label>
          <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
            {statsConfig.includeStats && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Stats Card
                </p>
                <div className="relative w-full max-w-[495px] mx-auto">
                  {!imageErrors.stats ? (
                    <>
                      <div className="w-full h-[195px] rounded-lg animate-pulse bg-muted absolute" />
                      <Image
                        src={statsUrl}
                        alt={`${username}'s GitHub Stats`}
                        width={495}
                        height={195}
                        className="w-full h-auto rounded-lg relative z-10"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, stats: true }))
                        }
                        unoptimized
                        key={statsUrl}
                      />
                    </>
                  ) : (
                    <div className="w-full h-[195px] rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30">
                      <p className="text-sm text-muted-foreground">
                        Failed to load preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {statsConfig.includeStreak && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">
                  Streak Card
                </p>
                <div className="relative w-full max-w-[495px] mx-auto">
                  {!imageErrors.streak ? (
                    <>
                      <div className="w-full h-[195px] rounded-lg animate-pulse bg-muted absolute" />
                      <Image
                        src={streakUrl}
                        alt={`${username}'s GitHub Streak`}
                        width={495}
                        height={195}
                        className="w-full h-auto rounded-lg relative z-10"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, streak: true }))
                        }
                        unoptimized
                        key={streakUrl}
                      />
                    </>
                  ) : (
                    <div className="w-full h-[195px] rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/30">
                      <p className="text-sm text-muted-foreground">
                        Failed to load preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!statsConfig.includeStats && !statsConfig.includeStreak && (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  No cards selected. Toggle at least one card above to see the
                  preview.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
