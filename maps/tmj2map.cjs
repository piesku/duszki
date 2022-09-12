#!/usr/bin/env node

const {readFileSync} = require("fs");
const {parseArgs} = require("util");

let {positionals} = parseArgs({
    allowPositionals: true,
});

if (positionals.length !== 1) {
    console.error("Convert Tiled's JSON format to a TypeScript source file.");
    console.error("  node json2map.cjs tiled.json > map.ts");
    process.exit(1);
}

let tiled_content = readFileSync(positionals[0], "utf8");
let tiled_json = JSON.parse(tiled_content);

let map = {
    Width: tiled_json.width,
    Height: tiled_json.height,
    Tiles: [],
};

const TILED_FLIP_HORIZONTAL = 1 << 31;
const OURS_FLIP_HORIZONTAL = 1 << 8;

for (let tiled_layer of tiled_json.layers) {
    // Convert a tile layer from right-down render order to right-up.
    for (let y = 0; y < tiled_layer.height; y++) {
        for (let x = 0; x < tiled_layer.width; x++) {
            let tile = tiled_layer.data[(tiled_layer.height - y - 1) * tiled_layer.width + x];
            if (tile === 0) {
                // Empty tile.
                map.Tiles[y * tiled_layer.width + x] = null;
                continue;
            }

            if (tile & TILED_FLIP_HORIZONTAL) {
                tile = (tile & ~TILED_FLIP_HORIZONTAL) | OURS_FLIP_HORIZONTAL;
            }

            // Tiled's tile IDs are 1-based, but we want 0-based.
            map.Tiles[y * tiled_layer.width + x] = tile - 1;
        }
    }

    // We don't care about other layers.
    break;
}

let map_name = positionals[0].replace(/\.json$/, "");
console.log(`// prettier-ignore
export const ${map_name} = ${JSON.stringify(map)};`);
