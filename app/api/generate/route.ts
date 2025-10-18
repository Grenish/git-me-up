import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import fs from "fs";
import path from "path";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { githubUrl } = await req.json();

    if (!githubUrl) {
      return Response.json(
        { error: "GitHub URL is required" },
        { status: 400 },
      );
    }

    // Read the prompt template
    const promptPath = path.join(process.cwd(), "lib", "prompt.md");
    const promptTemplate = fs.readFileSync(promptPath, "utf-8");

    // Build the full prompt with GitHub URL
    const fullPrompt = `${promptTemplate}

GitHub Profile URL: ${githubUrl}`;

    // Generate bio using Gemini
    const { text } = await generateText({
      model: google("gemini-flash-latest"),
      prompt: fullPrompt,
    });

    // Clean up the response (remove quotes if present)
    const cleanedBio = text.replace(/^["']|["']$/g, "").trim();

    return Response.json({ bio: cleanedBio });
  } catch (error) {
    console.error("Error generating bio:", error);
    return Response.json({ error: "Failed to generate bio" }, { status: 500 });
  }
}
