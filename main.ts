// Museum of the Year 3000 — one line, <=200 chars: the museum label a museum
// in the year 3000 puts next to an ordinary object from today. Judge: a
// deadpan curator; the humour must come from the year 3000 misreading the
// object, in a short straight-faced label. Here the object is a single sock,
// and the future misreads the dryer as a ritual sacrifice site.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

const OBJECT = "Single sock, left foot";
const DATE = "c. 2024";
const NOTE = "Worn in pairs, lost singly; archaeologists believe the dryer was a ritual sacrifice site.";

function formatLabel(object: string, date: string, note: string): string {
  // Museum labels open with the object and its date, then the straight-faced
  // reading. The semicolon keeps it one line with two beats.
  return `${object}, ${date}. ${note}`;
}

function checkLabel(text: string): void {
  if (text.length < 1 || text.length > LIMIT) {
    throw new Error(`label must be 1-${LIMIT} chars, got ${text.length}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("label must be one line");
  }
  if (!text.includes("c. 2024")) {
    throw new Error("label must carry its date");
  }
}

const line = formatLabel(OBJECT, DATE, NOTE);
checkLabel(line);
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "entry.txt"), line + "\n", "utf8");
console.log(`${line.length} chars: ${line}`);
