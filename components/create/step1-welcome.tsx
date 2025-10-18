"use client";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";

interface Step1WelcomeProps {
  username: string;
  onNext: () => void;
}

export function Step1Welcome({ username, onNext }: Step1WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Hey {username}!</h1>
      <p className="w-11/12 text-center mt-2">
        Let&apos;s create something extraordinarily simple and professional for
        your <Kbd>README.md</Kbd>. Shall we?
      </p>
      <Button className="mt-5" variant={"outline"} onClick={onNext}>
        Let&apos;s Go
      </Button>
    </div>
  );
}
