import {Blueprint} from "../lib/game.js";
import {local_transform2d} from "./components/com_local_transform2d.js";
import {render2d} from "./components/com_render2d.js";
import {Game} from "./game.js";

// Tiled has its own flip flags, which are converted to ours in maps/tmj2map.cjs.
const enum TileFlip {
    Horizontal = 1 << 8,
}

export function* tiled_blueprints(
    layer: Array<number>,
    width: number
): Generator<[string, Blueprint<Game>]> {
    for (let i = 0; i < layer.length; i++) {
        let global_id = layer[i]; // Global ID with flip flags.
        let tile_id = global_id & ~TileFlip.Horizontal; // Remove flip flags.
        if (tile_id == 0) {
            continue;
        }

        let x = (i % width) - Math.floor(width / 2);
        let y = Math.floor(i / width);
        let local: ReturnType<typeof local_transform2d>;

        // Rotate and flip flags are stored in the global ID.
        if (global_id & TileFlip.Horizontal) {
            local = local_transform2d([x, y], 0, [-1, 1]);
        } else {
            local = local_transform2d([x, y]);
        }

        let tile_name = `${tile_id - 1}.png`.padStart(7, "0");
        yield [tile_name, [local, render2d(tile_name)]];
    }
}
