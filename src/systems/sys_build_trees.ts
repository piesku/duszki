import {instantiate} from "../../lib/game.js";
import {pointer_down} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {set_position} from "../components/com_local_transform2d.js";
import {Game} from "../game.js";
import {blueprint_tree_phantom} from "../scenes/blu_tree.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_build_trees(game: Game, delta: number) {
    let tree_placed = false;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "tree") {
                continue;
            }

            let local = game.World.LocalTransform2D[ent];
            let x = Math.round(local.Translation[0]);
            let y = Math.round(local.Translation[1]);

            // Check whether the tree can be placed.
            let can_be_placed = true;
            let cell = game.World.Grid[y]?.[x];
            if (cell && cell.TileEntity !== null) {
                can_be_placed = false;
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

                // Bring back the original tint.
                render.Color[0] = 1;
                render.Color[1] = 1;
                render.Color[2] = 1;
                render.Shift = 0;
            } else if (pointer_down(game, 2)) {
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
