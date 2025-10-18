"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WandSparkles, Lightbulb, ArrowLeft, CornerDownLeft } from "lucide-react";

interface Step2BioProps {
  textareaValue: string;
  onTextareaChange: (value: string) => void;
  onUseAI: () => void;
  onTemplate: () => void;
  onPrev: () => void;
  onNext: () => void;
  isGenerating: boolean;
}

export function Step2Bio({
  textareaValue,
  onTextareaChange,
  onUseAI,
  onTemplate,
  onPrev,
  onNext,
  isGenerating,
}: Step2BioProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Tell us about yourself!</h1>
      <div className="mt-5 w-11/12 md:w-1/3">
        <Textarea
          id="textarea"
          placeholder="What do you do?"
          value={textareaValue}
          onChange={(e) => onTextareaChange(e.target.value)}
        />
        <div className="flex items-center justify-between mt-1.5">
          <div className="space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  onClick={onUseAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? <Spinner /> : <WandSparkles />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Use AI</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon-sm"}
                  onClick={onTemplate}
                >
                  <Lightbulb />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Generate Template</TooltipContent>
            </Tooltip>
          </div>
          <div className="inline-flex gap-2">
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
      </div>

      <div className="mt-10 w-11/12 md:w-1/2 flex items-center justify-center">
        <p className="w-full md:w-1/2 text-center text-xs text-muted-foreground">
          Tip: Talk about what you do and what you&apos;re passionate about in
          concise sentences. Be specific!
        </p>
      </div>
    </div>
  );
}
