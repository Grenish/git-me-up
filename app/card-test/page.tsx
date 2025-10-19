"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Copy, Check, ExternalLink } from "lucide-react";

export default function CardTestPage() {
  const [username, setUsername] = useState("octocat");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [font, setFont] = useState<"montserrat" | "doto">("montserrat");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const statsUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=stats&font=${font}&t=${refreshKey}`;
  const streakUrl = `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=streak&font=${font}&t=${refreshKey}`;

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey(Date.now());
    setTimeout(() => setIsLoading(false), 1000);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const getMarkdown = (type: "stats" | "streak") => {
    const url =
      type === "stats"
        ? `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=stats&font=${font}`
        : `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=streak&font=${font}`;
    return `![GitHub ${type === "stats" ? "Stats" : "Streak"}](${url})`;
  };

  const getHTML = (type: "stats" | "streak") => {
    const url =
      type === "stats"
        ? `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=stats&font=${font}`
        : `${baseUrl}/api/github/stats?username=${username}&theme=${theme}&type=streak&font=${font}`;
    return `<img src="${url}" alt="GitHub ${type === "stats" ? "Stats" : "Streak"}" />`;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              GitHub Stats Card Tester
            </h1>
            <p className="text-muted-foreground">
              Test and debug GitHub stats cards with live preview
            </p>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="lg"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username">GitHub Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={theme}
                  onValueChange={(value: "dark" | "light") => setTheme(value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Select
                  value={font}
                  onValueChange={(value: "montserrat" | "doto") =>
                    setFont(value)
                  }
                >
                  <SelectTrigger id="font">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="doto">Doto Rounded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Tabs */}
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="stats">Stats Card</TabsTrigger>
            <TabsTrigger value="streak">Streak Card</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            {/* Stats Card Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Stats Card Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className={`flex items-center justify-center p-8 rounded-lg ${
                    theme === "dark" ? "bg-[#0D1117]" : "bg-white"
                  }`}
                >
                  <div className="relative">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                    <Image
                      src={statsUrl}
                      alt="GitHub Stats"
                      width={495}
                      height={195}
                      className="rounded-lg"
                      unoptimized
                      key={statsUrl}
                    />
                  </div>
                </div>

                {/* Code Examples */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Markdown</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(getMarkdown("stats"), "stats-md")
                        }
                      >
                        {copied === "stats-md" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <code className="block p-3 bg-muted rounded text-sm overflow-x-auto">
                      {getMarkdown("stats")}
                    </code>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>HTML</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(getHTML("stats"), "stats-html")
                        }
                      >
                        {copied === "stats-html" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <code className="block p-3 bg-muted rounded text-sm overflow-x-auto">
                      {getHTML("stats")}
                    </code>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Direct URL</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(
                              statsUrl.replace(/&t=\d+/, ""),
                              "stats-url"
                            )
                          }
                        >
                          {copied === "stats-url" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            window.open(
                              statsUrl.replace(/&t=\d+/, ""),
                              "_blank"
                            )
                          }
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <code className="block p-3 bg-muted rounded text-sm overflow-x-auto break-all">
                      {statsUrl.replace(/&t=\d+/, "")}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="streak" className="space-y-6">
            {/* Streak Card Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Streak Card Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  className={`flex items-center justify-center p-8 rounded-lg ${
                    theme === "dark" ? "bg-[#0D1117]" : "bg-white"
                  }`}
                >
                  <div className="relative">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
                        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                    <Image
                      src={streakUrl}
                      alt="GitHub Streak"
                      width={495}
                      height={195}
                      className="rounded-lg"
                      unoptimized
                      key={streakUrl}
                    />
                  </div>
                </div>

                {/* Code Examples */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Markdown</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(getMarkdown("streak"), "streak-md")
                        }
                      >
                        {copied === "streak-md" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <code className="block p-3 bg-muted rounded text-sm overflow-x-auto">
                      {getMarkdown("streak")}
                    </code>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>HTML</Label>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(getHTML("streak"), "streak-html")
                        }
                      >
                        {copied === "streak-html" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <code className="block p-3 bg-muted rounded text-sm overflow-x-auto">
                      {getHTML("streak")}
                    </code>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Direct URL</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(
                              streakUrl.replace(/&t=\d+/, ""),
                              "streak-url"
                            )
                          }
                        >
                          {copied === "streak-url" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            window.open(
                              streakUrl.replace(/&t=\d+/, ""),
                              "_blank"
                            )
                          }
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <code className="block p-3 bg-muted rounded text-sm overflow-x-auto break-all">
                      {streakUrl.replace(/&t=\d+/, "")}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Testing Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Use the <strong>Refresh</strong> button to reload cards with
                cache busting
              </li>
              <li>
                Try different usernames to test with various data sizes and
                formats
              </li>
              <li>
                Switch between dark and light themes to verify color contrast
              </li>
              <li>
                Test both font options (Montserrat and Doto Rounded) for
                typography
              </li>
              <li>
                Copy the generated code snippets to use in your README files
              </li>
              <li>
                Open the direct URL in a new tab to see the raw SVG output
              </li>
              <li>
                Check the browser console for any API errors or warnings
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
