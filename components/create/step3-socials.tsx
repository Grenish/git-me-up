"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  CornerDownLeft,
  Linkedin,
  Globe,
  Mail,
  Youtube,
  Instagram,
  Facebook,
  Twitch,
  Coffee,
} from "lucide-react";
import type { SocialHandles } from "./types";

interface Step3SocialsProps {
  socialHandles: SocialHandles;
  onSocialHandlesChange: (handles: SocialHandles) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Step3Socials({
  socialHandles,
  onSocialHandlesChange,
  onPrev,
  onNext,
}: Step3SocialsProps) {
  const updateHandle = (key: keyof SocialHandles, value: string) => {
    onSocialHandlesChange({
      ...socialHandles,
      [key]: value,
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Connect Your Socials</h1>
      <p className="w-11/12 md:w-1/2 text-center text-xs text-muted-foreground mt-2">
        Add your social media handles to help people connect with you. All
        fields are optional.
      </p>

      <div className="mt-5 w-11/12 md:w-1/2 max-w-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
            </svg>
          </div>
          <Input
            placeholder="username"
            value={socialHandles.twitter}
            onChange={(e) => updateHandle("twitter", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Linkedin className="h-5 w-5" />
          </div>
          <Input
            placeholder="username"
            value={socialHandles.linkedin}
            onChange={(e) => updateHandle("linkedin", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Youtube className="h-5 w-5" />
          </div>
          <Input
            placeholder="@channel"
            value={socialHandles.youtube}
            onChange={(e) => updateHandle("youtube", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Instagram className="h-5 w-5" />
          </div>
          <Input
            placeholder="username"
            value={socialHandles.instagram}
            onChange={(e) => updateHandle("instagram", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Facebook className="h-5 w-5" />
          </div>
          <Input
            placeholder="username"
            value={socialHandles.facebook}
            onChange={(e) => updateHandle("facebook", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Coffee className="h-5 w-5" />
          </div>
          <Input
            placeholder="username"
            value={socialHandles.buymeacoffee}
            onChange={(e) => updateHandle("buymeacoffee", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Twitch className="h-5 w-5" />
          </div>
          <Input
            placeholder="username"
            value={socialHandles.twitch}
            onChange={(e) => updateHandle("twitch", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Globe className="h-5 w-5" />
          </div>
          <Input
            placeholder="https://yourwebsite.com"
            value={socialHandles.website}
            onChange={(e) => updateHandle("website", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center bg-muted rounded-md">
            <Mail className="h-5 w-5" />
          </div>
          <Input
            placeholder="you@example.com"
            type="email"
            value={socialHandles.email}
            onChange={(e) => updateHandle("email", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon-sm"} onClick={onPrev}>
              <ArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Go Back</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"outline"} size={"icon-sm"} onClick={onNext}>
              <CornerDownLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
