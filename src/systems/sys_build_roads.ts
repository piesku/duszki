import {instantiate} from "../../lib/game.js";
import {pointer_down} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {set_position} from "../components/com_local_transform2d.js";
import {set_sprite} from "../components/com_render2d.js";
import {Game} from "../game.js";
import {blueprint_road_phantom} from "../scenes/blu_road.js";
import {GridType, Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

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
            let can_be_placed = true;
            let cell = game.World.Grid[y]?.[x];
            if (cell && cell.TileEntity !== null) {
                can_be_placed = false;
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

                // Bring back the original tint.
                render.Color[0] = 1;
                render.Color[1] = 1;
                render.Color[2] = 1;
                render.Shift = 0;

                // Pick a road tile based on the neighbors, and adjust neighbor
                // tiles, too.
                game.World.Grid[y][x].Type = GridType.Road;
                make_tiled_surface(game, x, y);
            } else if (pointer_down(game, 2)) {
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

export function make_tiled_surface(game: Game, x: number, y: number) {
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

export type NeighborSprites = {
    [x: number]: string;
    0: string;
    8: string;
    4: string;
    2: string;
    1: string;
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

let TreesNeighborSprites: NeighborSprites = {
    [0]: "028.png",
    [NeighborMasks.UP]: "014.png",
    [NeighborMasks.UP | NeighborMasks.RIGHT]: "044.png",
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

let Sprites = {
    [GridType.Road]: RoadNeighborSprites,
    [GridType.Trees]: RoadNeighborSprites,
};

function choose_tile_based_on_neighbors(
    game: Game,
    x: number,
    y: number
    // type: GridType
) {
    let tile = game.World.Grid[y][x].TileEntity;
    let type = game.World.Grid[y][x].Type;
    if (!tile || type == GridType.Other) {
        return;
    }

    let sprites = Sprites[type] || RoadNeighborSprites;
    let neighbors = 0;

    if (game.World.Grid[y + 1]?.[x].Type == type) {
        neighbors |= NeighborMasks.UP;
    }
    if (game.World.Grid[y][x + 1]?.Type == type) {
        neighbors |= NeighborMasks.RIGHT;
    }
    if (game.World.Grid[y - 1]?.[x].Type == type) {
        neighbors |= NeighborMasks.DOWN;
    }
    if (game.World.Grid[y][x - 1]?.Type == type) {
        neighbors |= NeighborMasks.LEFT;
    }

    set_sprite(game, tile, sprites[neighbors]);
}
