import {pointer_clicked, pointer_viewport} from "../../lib/input.js";
import {Entity} from "../../lib/world.js";
import {viewport_to_world} from "../components/com_camera2d.js";
import {NeedType} from "../components/com_needs.js";
import {query_up} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;
const WALKING = Has.Walk | Has.Render2D;

export function sys_control_mouse(game: Game, delta: number) {
    {
        // Unhighlight the currently hovered entity.
        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        let cell = game.World.Grid[y]?.[x];
        if (cell && cell.TileEntity !== null) {
            let render = game.World.Render2D[cell.TileEntity];
            render.Color[0] = 1;
            render.Color[1] = 1;
            render.Color[2] = 1;
        }
    }

    if (!pointer_viewport(game, game.PointerPosition)) {
        // No mouse input yet.
        return;
    }

    let main_camera_entity = game.Cameras[0];
    if (main_camera_entity !== undefined) {
        let camera = game.World.Camera2D[main_camera_entity];
        viewport_to_world(game.PointerPosition, camera, game.PointerPosition);
    }

    if (pointer_clicked(game, 0)) {
        game.SelectedEntity = null;

        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        let cell = game.World.Grid[y]?.[x];
        if (cell && cell.TileEntity !== null) {
            if (cell.Ocupados.length > 0) {
                game.SelectedEntity = cell.Ocupados[0];

                if (DEBUG) {
                    let duszki: Record<Entity, object> = {};
                    for (let ent of cell.Ocupados) {
                        let needs = game.World.Needs[ent];
                        duszki[ent] = {
                            Happy: needs.Value[NeedType.HAPPY],
                            Food: needs.Value[NeedType.FOOD],
                            Sleep: needs.Value[NeedType.SLEEP],
                        };
                    }
                    console.table(duszki);
                }
            } else if (game.World.Signature[cell.TileEntity] & Has.SpatialNode2D) {
                for (let parent_entity of query_up(game.World, cell.TileEntity, Has.Generator)) {
                    game.SelectedEntity = parent_entity;
                }
            }
        }
    }

    if (DEBUG && pointer_clicked(game, 1)) {
        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        let cell = game.World.Grid[y]?.[x];
        if (cell) {
            console.table(cell);
        }
    }

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let local = game.World.LocalTransform2D[ent];
            local.Translation[0] = Math.round(game.PointerPosition[0]);
            local.Translation[1] = Math.round(game.PointerPosition[1]);
            game.World.Signature[ent] |= Has.Dirty;
        }
    }
}
