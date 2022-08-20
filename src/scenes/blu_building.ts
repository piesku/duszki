import {Blueprint} from "../../lib/game.js";
import {children} from "../components/com_children.js";
import {control_player} from "../components/com_control_player.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {tiled_blueprints} from "../tiled.js";

interface TiledExport {
    Layers: Array<Array<number>>;
    Width: number;
    Height: number;
}

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

export function blueprint_building(game: Game, map: TiledExport, z: number) {
    let child_tiles: Array<Blueprint<Game>> = [];
    for (let layer of map.Layers) {
        for (let tile of tiled_blueprints(layer, map.Width, map.Height, z)) {
            child_tiles.push([spatial_node2d(), ...tile]);
        }
    }

    return [spatial_node2d(), local_transform2d(), control_player(), children(...child_tiles)];
}
