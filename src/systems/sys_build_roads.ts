import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {set_sprite} from "../components/com_render2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_build_roads(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "road") {
                continue;
            }

            let local = game.World.LocalTransform2D[ent];
            let x = Math.round(local.Translation[0]);
            let y = Math.round(local.Translation[1]);

            if (pointer_clicked(game, 0)) {
                if (game.World.Grid[y][x].entity === null) {
                    game.World.Grid[y][x].entity = ent;
                    game.World.Grid[y][x].walkable = true;

                    game.World.Signature[ent] &= ~Has.ControlPlayer;

                    make_road(game, x, y);
                }
            } else if (pointer_down(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }
}

function make_road(game: Game, x: number, y: number) {
    choose_road_tile_based_on_neighbors(game, x, y);

    if (game.World.Grid[y + 1][x].walkable) {
        choose_road_tile_based_on_neighbors(game, x, y + 1);
    }
    if (game.World.Grid[y][x + 1].walkable) {
        choose_road_tile_based_on_neighbors(game, x + 1, y);
    }
    if (game.World.Grid[y - 1][x].walkable) {
        choose_road_tile_based_on_neighbors(game, x, y - 1);
    }
    if (game.World.Grid[y][x - 1].walkable) {
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
    let tile = game.World.Grid[y][x].entity;
    if (tile === null) {
        return;
    }

    let neighbors = 0;

    if (game.World.Grid[y + 1][x].walkable) {
        neighbors |= NeighborMasks.UP;
    }
    if (game.World.Grid[y][x + 1].walkable) {
        neighbors |= NeighborMasks.RIGHT;
    }
    if (game.World.Grid[y - 1][x].walkable) {
        neighbors |= NeighborMasks.DOWN;
    }
    if (game.World.Grid[y][x - 1].walkable) {
        neighbors |= NeighborMasks.LEFT;
    }

    set_sprite(game, tile, NeighborSprites[neighbors]);
}
