"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import Image from "next/image";

interface Step4HeaderImageProps {
  headerImage: string | null;
  onOpenImagePreview: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Step4HeaderImage({
  headerImage,
  onOpenImagePreview,
  onPrev,
  onNext,
}: Step4HeaderImageProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Upload a Header Image</h1>
      <p className="w-11/12 md:w-1/2 text-center text-xs text-muted-foreground mt-2">
        For best results, use an image sized <strong>2560×1440 px</strong>.
        This header will appear at the top of your GitHub profile{" "}
        <Kbd>README</Kbd>.
      </p>

      {headerImage && (
        <div className="mt-4 rounded-lg overflow-hidden border">
          <Image
            src={headerImage}
            alt="Header preview"
            width={400}
            height={225}
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-2 mt-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon-sm"} onClick={onPrev}>
              <ArrowLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Go Back</TooltipContent>
        </Tooltip>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={onOpenImagePreview}
        >
          Upload an Image <Kbd>u</Kbd>
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} size={"icon-sm"} onClick={onNext}>
              <CornerDownLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Skip/Next</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
