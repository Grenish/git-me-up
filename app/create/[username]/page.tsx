"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import ProfileCard from "@/components/profile-card";
import { GitHubUserSchema, GitHubUser } from "@/components/profile-card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CornerDownLeft,
  Filter,
  FilterX,
  Image as ImageIcon,
  Lightbulb,
  Search,
  WandSparkles,
  Box,
  Code,
  Monitor,
  Server,
  GitBranch,
  Palette,
  Brain,
  Database,
  Bug,
  Plus,
  Wrench,
  Smartphone,
  Gamepad2,
  ShoppingCart,
  FileText,
  BarChart3,
  Shield,
  Package,
  Cloud,
  Sparkles,
  Space,
  ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Kbd } from "@/components/ui/kbd";
import ImagePreview from "@/components/image-preview";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { TechStack } from "@/lib/tech-stack";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

// Responsive media query hook (Safari-safe)
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();

    if (m.addEventListener) {
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    } else {
      // @ts-ignore - legacy Safari
      m.addListener(onChange);
      // @ts-ignore - legacy Safari
      return () => m.removeListener(onChange);
    }
  }, [query]);

  return matches;
}

type FilterItem = {
  key: string;
  label: string;
  Icon: LucideIcon;
};

const FILTERS: FilterItem[] = [
  { key: "language", label: "Language", Icon: Code },
  { key: "framework", label: "Framework", Icon: Box },
  { key: "frontend", label: "Frontend", Icon: Monitor },
  { key: "backend", label: "Backend", Icon: Server },
  { key: "database", label: "Database", Icon: Database },
  { key: "devops", label: "DevOps", Icon: GitBranch },
  { key: "testing", label: "Testing", Icon: Bug },
  { key: "mobile", label: "Mobile", Icon: Smartphone },
  { key: "ai", label: "AI/ML", Icon: Brain },
  { key: "design", label: "Design", Icon: Palette },
  { key: "BAAS", label: "BaaS", Icon: Cloud },
  { key: "tools", label: "Tools", Icon: Wrench },
  { key: "gamedev", label: "Game Dev", Icon: Gamepad2 },
  { key: "cms", label: "CMS", Icon: FileText },
  { key: "ecommerce", label: "E-commerce", Icon: ShoppingCart },
  { key: "data", label: "Data", Icon: BarChart3 },
  { key: "security", label: "Security", Icon: Shield },
  { key: "other", label: "Other", Icon: Package },
  { key: "i use arch btw", label: "i use arch btw", Icon: Sparkles },
];

export default function GetStartedPage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Filter visibility (show only first N, responsive)
  const [showAllFilters, setShowAllFilters] = useState(false);
  const isXs = useMediaQuery("(max-width: 640px)"); // Tailwind sm
  const baseVisible = isXs ? 4 : 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${username}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        const validatedUser = GitHubUserSchema.parse(data);
        setUser(validatedUser);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  // Keyboard shortcut for opening image preview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "u" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        setIsImagePreviewOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground mt-2">
            {error || "User not found"}
          </p>
        </div>
      </div>
    );
  }

  const template = [
    "Hey there! I'm [Your Role] focused on building [Type of Projects, e.g., accessible web applications]. I'm currently diving deep into [Your Current Tech, e.g., web security and Rust] and always excited to learn new things. Feel free to check out my work and say hi!",
    "As a [Your Role], I love tackling tough problems and turning ideas into code. My go-to stack is [Your Tech Stack, e.g., Node.js and React], but I believe the right tool depends on the job. I'm passionate about [Your Passion, e.g., creating clean, scalable solutions] and am always open to new projects and collaborations.",
    "I'm a [Your Role, e.g., web developer] with a passion for [Your Passion, e.g., building tools that solve real problems]. My current focus is on [Your Current Focus, e.g., exploring the intersection of AI and user experience], and I'm always on the lookout for exciting new projects. Let's connect and build something innovative together!",
  ];

  const handleTemplateClick = () => {
    const nextIndex = (currentTemplateIndex + 1) % template.length;
    setCurrentTemplateIndex(nextIndex);
    setTextareaValue(template[nextIndex]);
  };

  const handleUseAI = async () => {
    try {
      setIsGenerating(true);
      toast.info("Generating your bio with AI...");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubUrl: user.html_url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate bio");
      }

      const data = await response.json();
      setTextareaValue(data.bio);
      toast.success("Bio generated successfully!");
    } catch (error) {
      console.error("Error generating bio:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate bio",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageSelect = (imageUrl: string, imageFile?: File) => {
    setHeaderImage(imageUrl);
    console.log("Selected image:", imageUrl, imageFile);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  };

  const toggleTechSelection = (techName: string) => {
    setSelectedTech((prev) =>
      prev.includes(techName)
        ? prev.filter((t) => t !== techName)
        : [...prev, techName],
    );
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside className="w-96 md:flex hidden flex-col items-center justify-center">
        <ProfileCard user={user} />
      </aside>

      <main className="w-full flex flex-col items-center justify-center overflow-x-hidden min-w-0">
        {/* Screen content omitted for brevity */}

        {/*Screen 1*/}
        {/*<div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Hey {user.login}!</h1>
          <p className="w-11/12 text-center mt-2">
            Let&apos;s create something extraordinarily simple and professional
            for your <Kbd>README.md</Kbd>. Shall we?
          </p>
          <Button className="mt-5" variant={"outline"}>
            Let&apos;s Go
          </Button>
        </div>*/}

        {/*Screen 2*/}
        {/*<div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Tell us about yourself!</h1>
          <div className="mt-5 w-1/3">
            <Textarea
              id="textarea"
              placeholder="What do you do?"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
            <div className="flex items-center justify-between mt-1.5">
              <div className="space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className=""
                      variant={"outline"}
                      size={"icon-sm"}
                      onClick={handleUseAI}
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
                      className=""
                      variant={"outline"}
                      size={"icon-sm"}
                      onClick={handleTemplateClick}
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
                    <Button
                      className="text-xs"
                      variant={"ghost"}
                      size={"icon-sm"}
                    >
                      <ArrowLeft />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Go Back</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="text-xs"
                      variant={"outline"}
                      size={"icon-sm"}
                    >
                      <CornerDownLeft />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Next</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="mt-10 w-1/2 flex items-cente justify-center">
            <p className="w-1/2 text-center text-xs text-muted-foreground">
              Tip: Talk about what you do and what you&apos;re passionate about
              in concise sentence. Be specific!
            </p>
          </div>
        </div>*/}

        {/*Screen 3*/}

        {/*<div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Upload a Header Image</h1>
          <p className="w-1/2 text-center text-xs text-muted-foreground mt-2">
            For best results, use an image sized <strong>2560×1440 px</strong>.
            This header will appear at the top of your GitHub profile{" "}
            <Kbd>README</Kbd>.
          </p>

          <div className="flex items-center gap-2 mt-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"ghost"} size={"icon-sm"}>
                  <ArrowLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Go Back</TooltipContent>
            </Tooltip>
            <Button
              className=""
              variant={"outline"}
              size={"sm"}
              onClick={() => setIsImagePreviewOpen(true)}
            >
              Upload an Image <Kbd>u</Kbd>
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"ghost"} size={"icon-sm"}>
                  <CornerDownLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Skip/Next</TooltipContent>
            </Tooltip>
          </div>
        </div>*/}

        {/*<ImagePreview
          open={isImagePreviewOpen}
          onOpenChange={setIsImagePreviewOpen}
          onImageSelect={handleImageSelect}
        />*/}

        {/* Screen 4 */}
        <div className="flex w-full flex-col items-center justify-center min-w-0">
          <h1 className="text-2xl font-semibold">Define Your Tech Stack</h1>
          <p className="w-11/12 md:w-1/2 text-center text-xs text-muted-foreground mt-2">
            List the programming languages, frameworks, and tools you use
            regularly.
          </p>

          <div className="flex flex-col items-center justify-center w-full min-w-0">
            <div className="relative w-80 sm:w-96 mt-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search language, framework, tools, etc"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                          onPressedChange={() => toggleFilter(key)}
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
                      onPressedChange={() => toggleFilter(key)}
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
                        onClick={() => toggleTechSelection(tech.name)}
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
                    <Button className="" variant={"ghost"} size={"icon-sm"}>
                      <ArrowLeft />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Go Back</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="" variant={"outline"} size={"icon-sm"}>
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
      </main>
    </div>
  );
}
