import {instantiate} from "../../lib/game.js";
import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {set} from "../../lib/vec2.js";
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
            } else if (pointer_clicked(game, 2)) {
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
    [x: number]: number;
};

let RoadNeighborSprites: NeighborSprites = {
    [0]: 90,
    [NeighborMasks.UP]: 104,
    [NeighborMasks.UP | NeighborMasks.RIGHT]: 85,
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.LEFT]: 89,
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.LEFT | NeighborMasks.DOWN]: 90,
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.DOWN]: 88,
    [NeighborMasks.UP | NeighborMasks.LEFT]: 85,
    [NeighborMasks.UP | NeighborMasks.LEFT | NeighborMasks.DOWN]: 88,
    [NeighborMasks.UP | NeighborMasks.DOWN]: 104,
    [NeighborMasks.RIGHT]: 87,
    [NeighborMasks.RIGHT | NeighborMasks.LEFT]: 87,
    [NeighborMasks.RIGHT | NeighborMasks.LEFT | NeighborMasks.DOWN]: 89,
    [NeighborMasks.RIGHT | NeighborMasks.DOWN]: 85,
    [NeighborMasks.DOWN]: 104,
    [NeighborMasks.LEFT]: 87,
    [NeighborMasks.LEFT | NeighborMasks.DOWN]: 85,
};

function choose_tile_based_on_neighbors(game: Game, x: number, y: number) {
    let tile = game.World.Grid[y][x].TileEntity;
    let type = game.World.Grid[y][x].Type;
    let timesWalked = game.World.Grid[y][x].TimesWalked;

    if (!tile || type == GridType.Other) {
        return;
    }

    let local = game.World.LocalTransform2D[tile];
    set(local.Scale, 1, 1);
    game.World.Signature[tile] |= Has.Dirty;

    let neighbors = 0;

    if (game.World.Grid[y + 1]?.[x].Walkable) {
        neighbors |= NeighborMasks.UP;
        local.Scale[1] = -1;
    }
    if (game.World.Grid[y][x + 1]?.Walkable) {
        neighbors |= NeighborMasks.RIGHT;
    }
    if (game.World.Grid[y - 1]?.[x].Walkable) {
        neighbors |= NeighborMasks.DOWN;
    }
    if (game.World.Grid[y][x - 1]?.Walkable) {
        neighbors |= NeighborMasks.LEFT;
        local.Scale[0] = -1;
    }

    let sprite = RoadNeighborSprites[neighbors];
    if (timesWalked > ROAD_UPDATE_WALKS_THRESHOLD) {
        // Stone road tiles are offset from the regular road tiles by 33.
        sprite = sprite - 33;
    }

    set_sprite(game, tile, sprite);
}
