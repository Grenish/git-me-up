"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileCard from "@/components/profile-card";
import { GitHubUserSchema, GitHubUser } from "@/components/profile-card";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CornerDownLeft, Lightbulb, WandSparkles } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function GetStartedPage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");

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

        // Validate with Zod schema
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

  return (
    <div className="flex min-h-screen w-full">
      <aside className="w-96 flex flex-col items-center justify-center">
        <ProfileCard user={user} />
      </aside>

      <main className="w-full flex flex-col items-center justify-center">
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
        <div className="flex w-full flex-col items-center justify-center">
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
                    <Button className="" variant={"outline"} size={"icon-sm"}>
                      <WandSparkles />
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

          <div className="mt-10 w-1/2 flex items-cente justify-center">
            <p className="w-1/2 text-center text-xs text-muted-foreground">
              Tip: Talk about what you do and what you&apos;re passionate about
              in concise sentence. Be specific!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
