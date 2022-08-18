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
    Layers: [],
    Navigation: [],
};

for (let tiled_layer of tiled_json.layers) {
    let layer;
    if (tiled_layer.name === "Navigation") {
        layer = map.Navigation;
    } else {
        map.Layers.push([]);
        layer = map.Layers[map.Layers.length - 1];
    }

    // Convert a tile layer from right-down render order to right-up.
    for (let y = 0; y < tiled_layer.height; y++) {
        for (let x = 0; x < tiled_layer.width; x++) {
            layer[y * tiled_layer.width + x] =
                tiled_layer.data[(tiled_layer.height - y - 1) * tiled_layer.width + x];
            layer[(tiled_layer.height - y - 1) * tiled_layer.width + x] =
                tiled_layer.data[y * tiled_layer.width + x];
        }
    }
}

let map_name = positionals[0].replace(/\.json$/, "");
console.log(`// prettier-ignore
export const ${map_name} = ${JSON.stringify(map)};`);
