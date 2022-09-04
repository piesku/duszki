import {instantiate} from "../../lib/game.js";
import {pointer_down} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {set_sprite} from "../components/com_render2d.js";
import {Game} from "../game.js";
import {blueprint_road} from "../scenes/blu_road.js";
import {Has} from "../world.js";

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

                // Bring back the original tint.
                render.Color[0] = 1;
                render.Color[1] = 1;
                render.Color[2] = 1;
                render.Shift = 0;

                // Pick a road tile based on the neighbors, and adjust neighbor
                // tiles, too.
                make_road(game, x, y);
            } else if (pointer_down(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }

    if (road_placed) {
        // Create a new phantom road entity, ready to be placed again.
        instantiate(game, blueprint_road(game));
    }
}

export function make_road(game: Game, x: number, y: number) {
    choose_road_tile_based_on_neighbors(game, x, y);

    if (game.World.Grid[y + 1]?.[x].Walkable) {
        choose_road_tile_based_on_neighbors(game, x, y + 1);
    }
    if (game.World.Grid[y][x + 1]?.Walkable) {
        choose_road_tile_based_on_neighbors(game, x + 1, y);
    }
    if (game.World.Grid[y - 1]?.[x].Walkable) {
        choose_road_tile_based_on_neighbors(game, x, y - 1);
    }
    if (game.World.Grid[y][x - 1]?.Walkable) {
        choose_road_tile_based_on_neighbors(game, x - 1, y);
    }
}

const enum NeighborMasks {
    UP = 8,
    RIGHT = 4,
    DOWN = 2,
    LEFT = 1,
}

const NeighborSprites = {
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

function choose_road_tile_based_on_neighbors(game: Game, x: number, y: number) {
    let tile = game.World.Grid[y][x].TileEntity;
    if (tile === null) {
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

    set_sprite(game, tile, NeighborSprites[neighbors]);
}
