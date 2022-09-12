const {writeFileSync} = require("fs");
const Spritesmith = require("spritesmith");

if (process.argv.length < 4) {
    console.error("Generate a spritesheet and a spritemap from a set of images.");
    console.error("  node spritesmith.cjs FILES... sheet.png > sheet.json");
    process.exit(1);
}

let files = process.argv.slice(2);
let out_path = files.pop();

Spritesmith.run(
    {
        src: files,
        algorithm: "top-down",
        padding: 1,
    },
    function handleResult(err, result) {
        if (err) {
            throw err;
        }

        writeFileSync(__dirname + "/" + out_path, result.image);
        let sheet = {};
        for (let file in result.coordinates) {
            let {x, y, width, height} = result.coordinates[file];
            sheet[file] = y;
        }

        console.log(
            `// prettier-ignore
export let spritesheet: {
    [key: string]: number;
} =`,
            JSON.stringify(sheet, null, 4)
        );
    }
);
