"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight, User } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [enterPressCount, setEnterPressCount] = useState(0);

  const handleSearch = async () => {
    if (!username) return;

    // If user already searched once (has a name), redirect on second enter
    if (name && enterPressCount >= 1) {
      router.push(`/create/${username}`);
      return;
    }

    setIsLoading(true);
    setAvatarUrl("");

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        console.error("GitHub user not found");
        setName("");
        return;
      }
      const data = await response.json();
      setAvatarUrl(data.avatar_url);
      setName(data.name || data.login);
      setEnterPressCount(1);
    } catch (error) {
      console.error("Failed to fetch GitHub user:", error);
      setName("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative">
      <div className="flex flex-col items-center gap-6 relative">
        <Avatar className="h-40 w-40">
          <AvatarImage src={avatarUrl} alt={username} />
          <AvatarFallback>
            <User size={80} />
          </AvatarFallback>
        </Avatar>

        <div className="w-full max-w-sm space-y-2">
          <div className="flex gap-2">
            <Input
              id="name"
              placeholder="Github Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-full"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : <ArrowRight />}
            </Button>
          </div>
          <p className="text-sm text-center font-medium ml-0.5">
            {name ? (
              <>
                Hello {name}, <br /> press <Kbd>Enter</Kbd> to continue...
              </>
            ) : (
              <>
                <Kbd>Enter</Kbd> to continue
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
