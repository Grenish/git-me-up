"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface StatsPreviewProps {
  username: string;
  theme?: "dark" | "light";
}

export function StatsPreview({ username, theme = "dark" }: StatsPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://git-me-up.vercel.app";
  const statsUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=stats`;
  const streakUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=streak`;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [username, theme]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className="p-4 bg-muted/50 rounded-lg border">
        <p className="text-sm text-muted-foreground text-center">
          Unable to load GitHub stats. Please check the username and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full max-w-[495px]">
        {isLoading && (
          <div className="w-full h-[195px] rounded-lg animate-pulse bg-muted" />
        )}
        <Image
          src={statsUrl}
          alt={`${username}'s GitHub Stats`}
          width={495}
          height={195}
          className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized
        />
      </div>

      <div className="relative w-full max-w-[495px]">
        {isLoading && (
          <div className="w-full h-[195px] rounded-lg animate-pulse bg-muted" />
        )}
        <Image
          src={streakUrl}
          alt={`${username}'s GitHub Streak`}
          width={495}
          height={195}
          className={`w-full h-auto ${isLoading ? "hidden" : "block"}`}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized
        />
      </div>
    </div>
  );
}

export default StatsPreview;
