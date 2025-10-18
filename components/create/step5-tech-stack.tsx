"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeft, CornerDownLeft, Search, Plus } from "lucide-react";
import Image from "next/image";
import { TechStack } from "@/lib/tech-stack";
import { FILTERS } from "./filters";
import { useMediaQuery } from "./use-media-query";

interface Step5TechStackProps {
  selectedTech: string[];
  onToggleTech: (techName: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Step5TechStack({
  selectedTech,
  onToggleTech,
  searchQuery,
  onSearchQueryChange,
  activeFilters,
  onToggleFilter,
  onPrev,
  onNext,
}: Step5TechStackProps) {
  const isXs = useMediaQuery("(max-width: 640px)");
  const baseVisible = isXs ? 4 : 5;
  const [showAllFilters, setShowAllFilters] = useState(false);

  const filteredTechStack = useMemo(() => {
    return TechStack.filter((tech) => {
      const matchesSearch = tech.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilters.length === 0 || activeFilters.includes(tech.type);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilters]);

  const visibleFilters = useMemo(
    () => (showAllFilters ? FILTERS : FILTERS.slice(0, baseVisible)),
    [showAllFilters, baseVisible],
  );
  const hiddenCount = FILTERS.length - visibleFilters.length;

  return (
    <div className="flex w-full flex-col items-center justify-center min-w-0">
      <h1 className="text-2xl font-semibold">Define Your Tech Stack</h1>
      <p className="w-11/12 md:w-1/2 text-center text-xs text-muted-foreground mt-2">
        List the programming languages, frameworks, and tools you use regularly.
      </p>

      <div className="flex flex-col items-center justify-center w-full min-w-0">
        <div className="relative w-80 sm:w-96 mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search language, framework, tools, etc"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
        </div>

        <div className="mt-3 w-full max-w-[100vw] sm:max-w-4xl px-4 min-w-0 overflow-x-hidden">
          {isXs && showAllFilters ? (
            <div className="w-full min-w-0">
              <div className="w-full overflow-x-auto">
                <div
                  className="inline-grid grid-rows-2 grid-flow-col auto-cols-[max-content] gap-2 py-1"
                  aria-label="Filters"
                  role="group"
                >
                  {FILTERS.map(({ key, label, Icon }) => (
                    <Toggle
                      key={key}
                      variant={"outline"}
                      className={`rounded-full text-xs h-8 px-3 whitespace-nowrap ${
                        key === "i use arch btw"
                          ? "bg-gradient-to-r from-background to-accent text-white"
                          : ""
                      }`}
                      pressed={activeFilters.includes(key)}
                      onPressedChange={() => onToggleFilter(key)}
                    >
                      <Icon className="h-3.5 w-3.5 mr-1" />
                      {label}
                    </Toggle>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-2 sm:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-3"
                  onClick={() => setShowAllFilters(false)}
                  aria-label="Show fewer filters"
                >
                  Show less
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              {visibleFilters.map(({ key, label, Icon }) => (
                <Toggle
                  key={key}
                  variant={"outline"}
                  className={`rounded-full text-xs h-8 px-3 whitespace-nowrap ${
                    key === "i use arch btw" ? "bg-primary-foreground" : ""
                  }`}
                  pressed={activeFilters.includes(key)}
                  onPressedChange={() => onToggleFilter(key)}
                >
                  <Icon className="h-3.5 w-3.5 mr-1" />
                  {label}
                </Toggle>
              ))}

              {!showAllFilters && hiddenCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs h-8 px-3"
                  onClick={() => setShowAllFilters(true)}
                  aria-label={`Show ${hiddenCount} more filters`}
                >
                  +{hiddenCount}
                </Button>
              )}

              {showAllFilters && FILTERS.length > baseVisible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-3"
                  onClick={() => setShowAllFilters(false)}
                  aria-label="Show fewer filters"
                >
                  Show less
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 mx-auto w-full max-w-[100vw] sm:max-w-[720px] lg:max-w-[896px] box-border px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 h-96 overflow-y-auto">
          {filteredTechStack.length > 0 ? (
            filteredTechStack.map((tech) => (
              <div key={tech.short} className="space-y-0.5">
                <div className="flex items-center p-2 border rounded-t-md bg-background hover:bg-muted/50 transition-colors">
                  <Image
                    src={tech.logoPath}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div className="ml-2 flex-1 min-w-0">
                    <h2 className="font-semibold text-sm truncate">
                      {tech.name}
                    </h2>
                    <p className="text-xs text-muted-foreground capitalize">
                      {tech.type}
                    </p>
                  </div>
                </div>
                <div className="p-0.5 border border-t-0 rounded-b-md">
                  <Button
                    variant={
                      selectedTech.includes(tech.name) ? "default" : "ghost"
                    }
                    size={"icon-sm"}
                    className="w-full"
                    onClick={() => onToggleTech(tech.name)}
                  >
                    <Plus
                      className={
                        selectedTech.includes(tech.name) ? "rotate-45" : ""
                      }
                    />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-muted-foreground">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm61.66-93.66a8,8,0,0,1-11.32,11.32L168,123.31l-10.34,10.35a8,8,0,0,1-11.32-11.32L156.69,112l-10.35-10.34a8,8,0,0,1,11.32-11.32L168,100.69l10.34-10.35a8,8,0,0,1,11.32,11.32L179.31,112Zm-80-20.68L99.31,112l10.35,10.34a8,8,0,0,1-11.32,11.32L88,123.31,77.66,133.66a8,8,0,0,1-11.32-11.32L76.69,112,66.34,101.66A8,8,0,0,1,77.66,90.34L88,100.69,98.34,90.34a8,8,0,0,1,11.32,11.32ZM140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"></path>
                    </svg>
                  </EmptyMedia>
                  <EmptyTitle>Tech Stack Missing</EmptyTitle>
                  <EmptyDescription>
                    The stack you requested isn&apos;t listed. It might be
                    outdated or not yet added.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button className="" size={"sm"}>
                    Raise an issue
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </div>

        <div className="mt-5 w-full max-w-[100vw] sm:max-w-[720px] lg:max-w-[896px] flex flex-col items-center">
          <div className="w-full inline-flex justify-end px-4 gap-2">
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
          <p className="text-xs">
            Icons provided by{" "}
            <a
              href="https://techicons.dev/"
              className="underline"
              target="_blank"
            >
              TechIcons.dev
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
