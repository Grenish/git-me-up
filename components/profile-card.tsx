import { Github, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { z } from "zod";

// Zod schema for GitHub user data validation
export const GitHubUserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  followers: z.number(),
  following: z.number(),
  html_url: z.string().url(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;

interface ProfileCardProps {
  user: GitHubUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const handleGithubClick = () => {
    window.open(user.html_url, "_blank");
  };

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-40 h-40">
        <AvatarImage src={user.avatar_url} alt={user.login} />
        <AvatarFallback>
          <User size={80} />
        </AvatarFallback>
      </Avatar>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-semibold">{user.name || user.login}</h2>
        <p className="text-sm text-muted-foreground">@{user.login}</p>
        {user.bio && (
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            {user.bio}
          </p>
        )}
        <div className="inline-flex items-center gap-2 text-xs mt-3">
          <Users size={15} />
          <p>
            <span className="font-semibold">{user.followers}</span> followers
          </p>
          <p>
            <span className="font-semibold">{user.following}</span> following
          </p>
        </div>
      </div>
      <Button
        variant={"default"}
        size={"sm"}
        className="mt-4 gap-2"
        onClick={handleGithubClick}
      >
        <Github size={16} />
        View on GitHub
      </Button>
    </div>
  );
}
