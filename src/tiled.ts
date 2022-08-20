import {instantiate} from "../lib/game.js";
import {Entity} from "../lib/world.js";
import {local_transform2d} from "./components/com_local_transform2d.js";
import {order, render2d} from "./components/com_render2d.js";
import {Game} from "./game.js";

const enum TileFlip {
    // Raw flags defined by Tiled.
    Horizontal = 1 << 31,
    Vertical = 1 << 30,
    Diagonal = 1 << 29,
    Ignored = 1 << 28,

    // Useful combinations of flags.
    RotateLeft = TileFlip.Vertical | TileFlip.Diagonal,
    RotateRight = TileFlip.Horizontal | TileFlip.Diagonal,
    Rotate180 = TileFlip.Horizontal | TileFlip.Vertical,
    All = TileFlip.Horizontal | TileFlip.Vertical | TileFlip.Diagonal | TileFlip.Ignored,
}

export function instantiate_tiled_layer(
    game: Game,
    layer: Array<number>,
    width: number,
    z: number
) {
    let tile_entities: Array<Entity> = [];
    for (let i = 0; i < layer.length; i++) {
        let global_id = layer[i]; // Global ID with flip flags.
        let tile_id = global_id & ~TileFlip.All; // Remove flip flags.
        if (tile_id == 0) {
            continue;
        }

        let x = i % width;
        let y = Math.floor(i / width);
        let local: ReturnType<typeof local_transform2d>;

        // Rotate and flip flags are stored in the global ID.
        if ((global_id & TileFlip.RotateLeft) == TileFlip.RotateLeft) {
            local = local_transform2d([x, y], 90);
        } else if ((global_id & TileFlip.RotateRight) == TileFlip.RotateRight) {
            local = local_transform2d([x, y], -90);
        } else if ((global_id & TileFlip.Rotate180) == TileFlip.Rotate180) {
            local = local_transform2d([x, y], 180);
        } else if (global_id & TileFlip.Horizontal) {
            local = local_transform2d([x, y], 0, [-1, 1]);
        } else if (global_id & TileFlip.Vertical) {
            local = local_transform2d([x, y], 0, [1, -1]);
        } else {
            local = local_transform2d([x, y]);
        }

        let tile_name = `${tile_id - 1}.png`.padStart(7, "0");
        tile_entities.push(instantiate(game, [local, render2d(tile_name), order(z)]));
    }

    return tile_entities;
}

export function* tiled_blueprints(layer: Array<number>, width: number, height: number, z: number) {
    for (let i = 0; i < layer.length; i++) {
        let global_id = layer[i]; // Global ID with flip flags.
        let tile_id = global_id & ~TileFlip.All; // Remove flip flags.
        if (tile_id == 0) {
            continue;
        }

        let x = (i % width) - Math.floor(width / 2);
        let y = Math.floor(i / width) - Math.floor(height / 2);
        let local: ReturnType<typeof local_transform2d>;

        // Rotate and flip flags are stored in the global ID.
        if ((global_id & TileFlip.RotateLeft) == TileFlip.RotateLeft) {
            local = local_transform2d([x, y], 90);
        } else if ((global_id & TileFlip.RotateRight) == TileFlip.RotateRight) {
            local = local_transform2d([x, y], -90);
        } else if ((global_id & TileFlip.Rotate180) == TileFlip.Rotate180) {
            local = local_transform2d([x, y], 180);
        } else if (global_id & TileFlip.Horizontal) {
            local = local_transform2d([x, y], 0, [-1, 1]);
        } else if (global_id & TileFlip.Vertical) {
            local = local_transform2d([x, y], 0, [1, -1]);
        } else {
            local = local_transform2d([x, y]);
        }

        let tile_name = `${tile_id - 1}.png`.padStart(7, "0");
        yield [local, render2d(tile_name), order(z)];
    }
}
