#!/usr/bin/env node

const {readFileSync} = require("fs");
const {parseArgs} = require("util");

let {positionals} = parseArgs({
    allowPositionals: true,
});

if (positionals.length !== 1) {
    console.error("Convert MIDI in Tone.js JSON format to a TypeScript source file.");
    console.error("  node json2ts.cjs music.json > music.ts");
    process.exit(1);
}

let source_content = readFileSync(positionals[0], "utf8");
let source_json = JSON.parse(source_content);

let source_notes = source_json.tracks[0].notes;
let out_notes = [];

for (let note of source_notes) {
    out_notes.push(`[${note.time.toFixed(2)}, ${note.midi}, ${note.duration.toFixed(1)}]`);
}

let map_name = positionals[0].replace(/\.json$/, "");
console.log(`// prettier-ignore
export const ${map_name} = [
    ${out_notes.join(",\n    ")}
];`);
