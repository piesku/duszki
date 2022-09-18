import {instantiate} from "../../lib/game.js";
import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {set} from "../../lib/vec2.js";
import {Tile} from "../../sprites/spritesheet.js";
import {destroy_all} from "../components/com_children.js";
import {ControlPlayerKind} from "../components/com_control_player.js";
import {set_position} from "../components/com_local_transform2d.js";
import {set_sprite} from "../components/com_render2d.js";
import {Game} from "../game.js";
import {blueprint_tree_phantom} from "../scenes/blu_tree.js";
import {GridType, Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_build_trees(game: Game, delta: number) {
    let tree_placed = false;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== ControlPlayerKind.Tree) {
                continue;
            }

            let local = game.World.LocalTransform2D[ent];
            let x = Math.round(local.Translation[0]);
            let y = Math.round(local.Translation[1]);

            // Check whether the tree can be placed.
            let can_be_placed = false;
            let cell = game.World.Grid[y]?.[x];
            if (cell && cell.TileEntity === null) {
                can_be_placed = true;
            }

            // Tint the tree according to whether it can be placed.
            let render = game.World.Render2D[ent];
            render.Color[0] = can_be_placed ? 0 : 1;
            render.Color[1] = can_be_placed ? 1 : 0;
            render.Color[2] = 0;

            if (can_be_placed && pointer_down(game, 0)) {
                game.World.Signature[ent] &= ~Has.ControlPlayer;
                tree_placed = true;

                // Populate the world grid.
                cell.TileEntity = ent;
                cell.Walkable = false;
                cell.Pleasant = true;
                cell.Type = GridType.Tree;
                make_tiled_park(game, x, y);

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

    if (tree_placed) {
        // Create a new phantom entity, ready to be placed again.
        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        instantiate(game, [...blueprint_tree_phantom(game), set_position(x, y)]);
    }
}

export function make_tiled_park(game: Game, x: number, y: number) {
    choose_tile_based_on_neighbors(game, x, y);

    if (game.World.Grid[y + 1]?.[x].Pleasant) {
        choose_tile_based_on_neighbors(game, x, y + 1);
    }
    if (game.World.Grid[y][x + 1]?.Pleasant) {
        choose_tile_based_on_neighbors(game, x + 1, y);
    }
    if (game.World.Grid[y - 1]?.[x].Pleasant) {
        choose_tile_based_on_neighbors(game, x, y - 1);
    }
    if (game.World.Grid[y][x - 1]?.Pleasant) {
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

let TreesNeighborSprites: NeighborSprites = {
    [0]: Tile.Tree,
    [NeighborMasks.UP]: Tile.TreeTop,
    [NeighborMasks.UP | NeighborMasks.RIGHT]: Tile.TreeTopRight,
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.LEFT]: Tile.TreeTopLeftRight,
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.LEFT | NeighborMasks.DOWN]:
        Tile.TreeMiddle,
    [NeighborMasks.UP | NeighborMasks.RIGHT | NeighborMasks.DOWN]: Tile.TreeTopRightDown,
    [NeighborMasks.UP | NeighborMasks.LEFT]: Tile.TreeTopRight,
    [NeighborMasks.UP | NeighborMasks.LEFT | NeighborMasks.DOWN]: Tile.TreeTopRightDown,
    [NeighborMasks.UP | NeighborMasks.DOWN]: Tile.TreeTopDown,
    [NeighborMasks.RIGHT]: Tile.TreeRight,
    [NeighborMasks.RIGHT | NeighborMasks.LEFT]: Tile.TreeLeftRight,
    [NeighborMasks.RIGHT | NeighborMasks.LEFT | NeighborMasks.DOWN]: Tile.TreeLeftRightDown,
    [NeighborMasks.RIGHT | NeighborMasks.DOWN]: Tile.TreeRightDown,
    [NeighborMasks.DOWN]: Tile.TreeDown,
    [NeighborMasks.LEFT]: Tile.TreeRight,
    [NeighborMasks.LEFT | NeighborMasks.DOWN]: Tile.TreeRightDown,
};

function choose_tile_based_on_neighbors(game: Game, x: number, y: number) {
    let tile = game.World.Grid[y][x].TileEntity;
    let type = game.World.Grid[y][x].Type;
    if (!tile || type == GridType.Other) {
        return;
    }

    let local = game.World.LocalTransform2D[tile];
    set(local.Scale, 1, 1);
    game.World.Signature[tile] |= Has.Dirty;

    let neighbors = 0;

    if (game.World.Grid[y + 1]?.[x].Pleasant) {
        neighbors |= NeighborMasks.UP;
    }
    if (game.World.Grid[y][x + 1]?.Pleasant) {
        neighbors |= NeighborMasks.RIGHT;
    }
    if (game.World.Grid[y - 1]?.[x].Pleasant) {
        neighbors |= NeighborMasks.DOWN;
    }
    if (game.World.Grid[y][x - 1]?.Pleasant) {
        neighbors |= NeighborMasks.LEFT;
        local.Scale[0] = -1;
    }

    set_sprite(game, tile, TreesNeighborSprites[neighbors]);
}
