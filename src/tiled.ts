import {Blueprint} from "../lib/game.js";
import {local_transform2d} from "./components/com_local_transform2d.js";
import {render2d} from "./components/com_render2d.js";
import {Game} from "./game.js";

// Tiled has its own flip flags, which are converted to ours in maps/tmj2map.cjs.
const enum TileFlip {
    Horizontal = 1 << 8,
}

export function* tiled_blueprints(
    layer: Array<number | null>,
    width: number
): Generator<[number, Blueprint<Game>]> {
    for (let i = 0; i < layer.length; i++) {
        let tile_id = layer[i];
        if (tile_id === null) {
            continue;
        }

        let x = (i % width) - Math.floor(width / 2);
        let y = Math.floor(i / width);
        let local: ReturnType<typeof local_transform2d>;

        if (tile_id & TileFlip.Horizontal) {
            local = local_transform2d([x, y], 0, [-1, 1]);
        } else {
            local = local_transform2d([x, y]);
        }

        // Remove flip flags.
        tile_id &= ~TileFlip.Horizontal;
        yield [tile_id, [local, render2d(tile_id)]];
    }
}
