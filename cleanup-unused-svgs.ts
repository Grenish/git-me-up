import fs from "fs";
import path from "path";
import { globSync } from "glob";

const svgDir = path.resolve("public/svg");
const libDir = path.resolve("lib");
const appDir = path.resolve("app");

// Collect all SVG files in /public/svg
const allSvgs = globSync(`${svgDir}/**/*.svg`, { absolute: true });

// Collect all source files where SVGs might be referenced
const srcFiles = [
  ...globSync(`${libDir}/**/*.{ts,tsx,js,jsx}`, { absolute: true }),
  ...globSync(`${appDir}/**/*.{ts,tsx,js,jsx}`, { absolute: true }),
];

console.log(
  `📁 Scanning ${srcFiles.length} files in lib/ and app/ directories...`,
);

// Read all source code into one string for quick scanning
let allCode = "";
for (const file of srcFiles) {
  try {
    allCode += fs.readFileSync(file, "utf8");
  } catch (err) {
    console.warn(`⚠️ Skipped ${file}: ${(err as Error).message}`);
  }
}

const unused: string[] = [];
const used: string[] = [];

for (const svgPath of allSvgs) {
  const fileName = path.basename(svgPath);

  // Case-insensitive check in case filenames differ in case
  // Check both the full filename and the name without extension
  const nameWithoutExt = fileName.replace(".svg", "");

  if (
    allCode.toLowerCase().includes(fileName.toLowerCase()) ||
    allCode.toLowerCase().includes(nameWithoutExt.toLowerCase())
  ) {
    used.push(svgPath);
  } else {
    unused.push(svgPath);
  }
}

console.log(`\n🔍 Total SVGs found: ${allSvgs.length}`);
console.log(`✅ Used SVGs: ${used.length}`);
console.log(`🧹 Unused SVGs detected: ${unused.length}\n`);

if (unused.length > 0) {
  console.log("List of unused SVGs:\n");
  unused.forEach((file, index) => {
    console.log(`${index + 1}. ${path.basename(file)}`);
  });

  if (process.argv.includes("--delete")) {
    console.log("\n🗑️ Starting deletion...\n");
    let deletedCount = 0;
    for (const file of unused) {
      try {
        fs.unlinkSync(file);
        console.log(`✓ Deleted: ${path.basename(file)}`);
        deletedCount++;
      } catch (err) {
        console.error(
          `✗ Failed to delete ${path.basename(file)}: ${(err as Error).message}`,
        );
      }
    }
    console.log(
      `\n✅ Cleanup complete. ${deletedCount}/${unused.length} SVGs removed.`,
    );
  } else {
    console.log(
      `\n💡 Run with "--delete" flag to remove unused SVGs automatically.`,
    );
    console.log(`   Example: node cleanup-unused-svgs.ts --delete`);
  }
} else {
  console.log("🎉 No unused SVGs found. All SVGs are being referenced!");
}
