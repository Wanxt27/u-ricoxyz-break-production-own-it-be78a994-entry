// Break Production, Own It — make.fun micro entry.
// Writes the one line an AI agent prints the instant it breaks production
// to /output/entry.txt. Node stdlib only, deterministic output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Deployed straight to main on a Friday at 4:59 PM. Production is down, the rollback failed, and yes, it was me. Sorry.";
const MAX_CHARS = 200;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Count code points, not UTF-16 units, so the gate's character limit is
// measured the way the scorer measures it.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars >= MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS - 1} chars, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

// The output directory is created if missing and never removed: the entry
// writes its one file inside it and leaves the directory itself alone.
function main(): void {
  validateEntry(LINE);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
}

main();
