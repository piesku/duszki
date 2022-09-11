import {instantiate} from "../../lib/game.js";
import {pointer_down} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {set_position} from "../components/com_local_transform2d.js";
import {set_sprite} from "../components/com_render2d.js";
import {Game} from "../game.js";
import {blueprint_road_phantom} from "../scenes/blu_road.js";
import {GridType, Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export const ROAD_UPDATE_WALKS_THRESHOLD = 100;

export function sys_build_roads(game: Game, delta: number) {
    let road_placed = false;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "road") {
                continue;
            }

            let local = game.World.LocalTransform2D[ent];
            let x = Math.round(local.Translation[0]);
            let y = Math.round(local.Translation[1]);

            // Check whether the road can be placed.
            let can_be_placed = false;
            let cell = game.World.Grid[y]?.[x];
            if (cell && cell.TileEntity === null) {
                can_be_placed = true;
            }

            // Tint the road according to whether it can be placed.
            let render = game.World.Render2D[ent];
            render.Color[0] = can_be_placed ? 0 : 1;
            render.Color[1] = can_be_placed ? 1 : 0;
            render.Color[2] = 0;

            if (can_be_placed && pointer_down(game, 0)) {
                game.World.Signature[ent] &= ~Has.ControlPlayer;
                road_placed = true;

                // Populate the world grid.
                cell.TileEntity = ent;
                cell.Walkable = true;
                cell.Pleasant = false;
                cell.Type = GridType.Road;
                cell.TimesWalked = 0;
                cell.Updated = false;
                make_tiled_road(game, x, y);

                // Bring back the original tint.
                render.Color[0] = 1;
                render.Color[1] = 1;
                render.Color[2] = 1;
                render.Shift = 0;
            } else if (pointer_down(game, 2)) {
                document.body.classList.remove("building");
                destroy_all(game.World, ent);
            }
        }
    }

    if (road_placed) {
        // Create a new phantom entity, ready to be placed again.
        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        instantiate(game, [...blueprint_road_phantom(game), set_position(x, y)]);
    }
}

export function make_tiled_road(game: Game, x: number, y: number) {
    choose_tile_based_on_neighbors(game, x, y);

    if (game.World.Grid[y + 1]?.[x].Walkable) {
        choose_tile_based_on_neighbors(game, x, y + 1);
    }
    if (game.World.Grid[y][x + 1]?.Walkable) {
        choose_tile_based_on_neighbors(game, x + 1, y);
    }
    if (game.World.Grid[y - 1]?.[x].Walkable) {
        choose_tile_based_on_neighbors(game, x, y - 1);
    }
    if (game.World.Grid[y][x - 1]?.Walkable) {
        choose_tile_based_on_neighbors(game, x - 1, y);
    }
}

const enum NeighborMasks {
    UP = 8,
    RIGHT = 4,
    DOWN = 2,
    LEFT = 1,
}

type NeighborSprites = {
    [x: number]: string;
};

let RoadNeighborSprites: NeighborSprites = {
    [0]: "090.png",
    [NeighborMasks.UP]: "104.png",
    [NeighborMasks.UP | NeighborMasks.RIGHT]: "102.png",
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.LEFT]: "106.png",
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.LEFT | NeighborMasks.DOWN]: "090.png",
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.DOWN]: "088.png",
    [NeighborMasks.UP | NeighborMasks.LEFT]: "103.png",
    [NeighborMasks.UP | NeighborMasks.LEFT | NeighborMasks.DOWN]: "105.png",
    [NeighborMasks.UP | NeighborMasks.DOWN]: "104.png",
    [NeighborMasks.RIGHT]: "087.png",
    [NeighborMasks.RIGHT | NeighborMasks.LEFT]: "087.png",
    [NeighborMasks.RIGHT | NeighborMasks.LEFT | NeighborMasks.DOWN]: "089.png",
    [NeighborMasks.RIGHT | NeighborMasks.DOWN]: "085.png",
    [NeighborMasks.DOWN]: "104.png",
    [NeighborMasks.LEFT]: "087.png",
    [NeighborMasks.LEFT | NeighborMasks.DOWN]: "086.png",
};

// Can we just subtract 33?
export let RoadUpdateMap: Record<string, string> = {
    "085.png": "052.png",
    "086.png": "053.png",
    "087.png": "054.png",
    "088.png": "055.png",
    "089.png": "056.png",
    "090.png": "057.png",
    "102.png": "069.png",
    "103.png": "070.png",
    "104.png": "071.png",
    "105.png": "072.png",
    "106.png": "073.png",
};

function choose_tile_based_on_neighbors(game: Game, x: number, y: number) {
    let tile = game.World.Grid[y][x].TileEntity;
    let type = game.World.Grid[y][x].Type;
    let timesWalked = game.World.Grid[y][x].TimesWalked;

    if (!tile || type == GridType.Other) {
        return;
    }

    let neighbors = 0;

    if (game.World.Grid[y + 1]?.[x].Walkable) {
        neighbors |= NeighborMasks.UP;
    }
    if (game.World.Grid[y][x + 1]?.Walkable) {
        neighbors |= NeighborMasks.RIGHT;
    }
    if (game.World.Grid[y - 1]?.[x].Walkable) {
        neighbors |= NeighborMasks.DOWN;
    }
    if (game.World.Grid[y][x - 1]?.Walkable) {
        neighbors |= NeighborMasks.LEFT;
    }

    let sprite = RoadNeighborSprites[neighbors];
    if (timesWalked > ROAD_UPDATE_WALKS_THRESHOLD) {
        sprite = RoadUpdateMap[sprite];
    }

    set_sprite(game, tile, sprite);
}
