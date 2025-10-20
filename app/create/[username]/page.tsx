"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileCard from "@/components/profile-card";
import { GitHubUserSchema, GitHubUser } from "@/components/profile-card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import ImagePreview from "@/components/image-preview";
import { motion, AnimatePresence } from "motion/react";
import {
  Step1Welcome,
  Step2Bio,
  Step3Socials,
  Step4HeaderImage,
  Step5TechStack,
  Step6StatsConfig,
  Step7Preview,
  generateMarkdown,
  defaultSocialHandles,
  type SocialHandles,
  type StatsConfig,
} from "@/components/create";

const TEMPLATES = [
  "Hey there! I'm [Your Role] focused on building [Type of Projects, e.g., accessible web applications]. I'm currently diving deep into [Your Current Tech, e.g., web security and Rust] and always excited to learn new things. Feel free to check out my work and say hi!",
  "As a [Your Role], I love tackling tough problems and turning ideas into code. My go-to stack is [Your Tech Stack, e.g., Node.js and React], but I believe the right tool depends on the job. I'm passionate about [Your Passion, e.g., creating clean, scalable solutions] and am always open to new projects and collaborations.",
  "I'm a [Your Role, e.g., web developer] with a passion for [Your Passion, e.g., building tools that solve real problems]. My current focus is on [Your Current Focus, e.g., exploring the intersection of AI and user experience], and I'm always on the lookout for exciting new projects. Let's connect and build something innovative together!",
];

export default function GetStartedPage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form data
  const [textareaValue, setTextareaValue] = useState("");
  const [socialHandles, setSocialHandles] =
    useState<SocialHandles>(defaultSocialHandles);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [statsConfig, setStatsConfig] = useState<StatsConfig>({
    font: "montserrat",
    theme: "dark",
    includeStats: true,
    includeStreak: true,
    includeTopLang: false,
  });

  // UI states
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

  const handleTemplateClick = () => {
    const nextIndex = (currentTemplateIndex + 1) % TEMPLATES.length;
    setCurrentTemplateIndex(nextIndex);
    setTextareaValue(TEMPLATES[nextIndex]);
  };

  const handleUseAI = async () => {
    try {
      setIsGenerating(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubUrl: user?.html_url,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate bio");
      }

      const data = await response.json();
      setTextareaValue(data.bio);
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

  const goToNext = () => {
    if (currentStep < 7) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrev = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCopyMarkdown = () => {
    const markdown = generateMarkdown({
      user,
      headerImage,
      textareaValue,
      socialHandles,
      selectedTech,
      statsConfig,
    });
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  const handleReset = () => {
    setTextareaValue("");
    setSocialHandles(defaultSocialHandles);
    setHeaderImage(null);
    setSelectedTech([]);
    setStatsConfig({
      font: "montserrat",
      theme: "dark",
      includeStats: true,
      includeStreak: true,
      includeTopLang: false,
    });
    setCurrentStep(1);
    setDirection(-1);
    toast.info("Reset complete!");
  };

  // Motion variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const transition = {
    x: { type: "spring" as const, stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

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

  return (
    <div className="flex min-h-screen w-full">
      <aside className="w-96 md:flex hidden flex-col items-center justify-center">
        <ProfileCard user={user} />
      </aside>

      <main className="w-full flex flex-col items-center justify-center overflow-hidden min-w-0 relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex flex-col items-center justify-center absolute"
            >
              <Step1Welcome username={user.login} onNext={goToNext} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex w-full flex-col items-center justify-center absolute"
            >
              <Step2Bio
                textareaValue={textareaValue}
                onTextareaChange={setTextareaValue}
                onUseAI={handleUseAI}
                onTemplate={handleTemplateClick}
                onPrev={goToPrev}
                onNext={goToNext}
                isGenerating={isGenerating}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex w-full flex-col items-center justify-center absolute"
            >
              <Step3Socials
                socialHandles={socialHandles}
                onSocialHandlesChange={setSocialHandles}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex w-full flex-col items-center justify-center absolute"
            >
              <Step4HeaderImage
                headerImage={headerImage}
                onOpenImagePreview={() => setIsImagePreviewOpen(true)}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex w-full flex-col items-center justify-center min-w-0 absolute"
            >
              <Step5TechStack
                selectedTech={selectedTech}
                onToggleTech={toggleTechSelection}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                activeFilters={activeFilters}
                onToggleFilter={toggleFilter}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="step6"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex w-full flex-col items-center justify-center absolute"
            >
              <Step6StatsConfig
                username={user.login}
                statsConfig={statsConfig}
                onStatsConfigChange={setStatsConfig}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div
              key="step7"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="flex w-full flex-col items-center justify-center absolute"
            >
              <Step7Preview
                markdown={generateMarkdown({
                  user,
                  headerImage,
                  textareaValue,
                  socialHandles,
                  selectedTech,
                  statsConfig,
                })}
                onPrev={goToPrev}
                onReset={handleReset}
                onCopyMarkdown={handleCopyMarkdown}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ImagePreview
        open={isImagePreviewOpen}
        onOpenChange={setIsImagePreviewOpen}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
}
