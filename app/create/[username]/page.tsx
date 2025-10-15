"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProfileCard from "@/components/profile-card";
import { GitHubUserSchema, GitHubUser } from "@/components/profile-card";
import { Spinner } from "@/components/ui/spinner";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function GetStartedPage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            <Textarea placeholder="What do you do?" />
          </div>
        </div>
      </main>
    </div>
  );
}
