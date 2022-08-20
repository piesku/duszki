import {pointer_clicked, pointer_viewport} from "../../lib/input.js";
import {Vec2} from "../../lib/math.js";
import {viewport_to_world} from "../components/com_camera2d.js";
import {set_sprite} from "../components/com_render2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

const pointer_position: Vec2 = [0, 0];
const SPAWN_INTERVAL = 0.1;
let time_since_last_spawn = 0;

const CENTER_ROAD_TILE = "090.png";

export function sys_control_mouse(game: Game, delta: number) {
    time_since_last_spawn += delta;

    if (!pointer_viewport(game, pointer_position)) {
        // No mouse, no touch.
        return;
    }

    let camera_entity = game.Cameras[0];
    if (camera_entity === undefined) {
        return;
    }

    let camera = game.World.Camera2D[camera_entity];
    viewport_to_world(pointer_position, camera, pointer_position);

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let local = game.World.LocalTransform2D[ent];
            local.Translation[0] = Math.round(pointer_position[0]);
            local.Translation[1] = Math.round(pointer_position[1]);
            game.World.Signature[ent] |= Has.Dirty;
        }
    }

    if (time_since_last_spawn > SPAWN_INTERVAL) {
        if (pointer_clicked(game, 0)) {
            const x = Math.round(pointer_position[0]);
            const y = Math.round(pointer_position[1]);

            game.World.Grid[y][x].walkable = true;
            make_road(game, x, y);
            time_since_last_spawn = 0;
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
    let tile = game.tile_entites[y * game.World.Width + x];
    if (tile === undefined) {
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
