"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, RotateCcwIcon, Clipboard } from "lucide-react";
import MarkdownIt from "@/components/markdown-it";

interface Step7PreviewProps {
  markdown: string;
  onPrev: () => void;
  onReset: () => void;
  onCopyMarkdown: () => void;
}

export function Step7Preview({
  markdown,
  onPrev,
  onReset,
  onCopyMarkdown,
}: Step7PreviewProps) {
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
        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"} size={"icon-sm"} onClick={onReset}>
                <RotateCcwIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                size={"icon-sm"}
                onClick={onCopyMarkdown}
              >
                <Clipboard />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy markdown</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="w-11/12 md:w-4xl mt-2 h-[900px] overflow-y-auto">
        <MarkdownIt>{markdown}</MarkdownIt>
      </div>
    </div>
  );
}
