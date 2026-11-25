// Meeting One Line — a single sentence that replaces an entire pointless meeting.
// SPDX-License-Identifier: MIT
// Copyright (c) 2026 A HUMAEDI

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one sentence that kills the meeting outright.
const ENTRY =
  "The decision was already made, the email already said it, and this meeting is just us reading it out loud together for an hour \u2014 so go back to work.";

// Guards: the gate accepts UTF-8 text of 1 to 200 characters, a single
// sentence, nothing but the line itself. One sentence means exactly one
// sentence-ending mark, placed at the very end, and no line breaks or
// doubled spaces hiding inside the line — the entry must stand alone
// with no context and no explanation attached.
function isSingleSentence(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > 200) return false;
  if (/[\r\n]/.test(trimmed) || /  /.test(trimmed)) return false;
  // Exactly one sentence-ending mark, and it must close the line.
  const terminators = trimmed.match(/[.!?]/g) ?? [];
  return terminators.length === 1 && trimmed.endsWith(".");
}

if (!isSingleSentence(ENTRY)) {
  console.error("Entry failed validation: must be one sentence, 1-200 chars.");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${outPath}`);
