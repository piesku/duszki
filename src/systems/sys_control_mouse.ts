import {pointer_clicked, pointer_viewport} from "../../lib/input.js";
import {Entity} from "../../lib/world.js";
import {viewport_to_world} from "../components/com_camera2d.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_control_mouse(game: Game, delta: number) {
    if (!pointer_viewport(game, game.PointerPosition)) {
        // No mouse, no touch.
        return;
    }

    let main_camera_entity = game.Cameras[0];
    if (main_camera_entity !== undefined) {
        let camera = game.World.Camera2D[main_camera_entity];
        viewport_to_world(game.PointerPosition, camera, game.PointerPosition);
    }

    let follow_camera_entity = game.Cameras[1];
    if (follow_camera_entity !== undefined && pointer_clicked(game, 0)) {
        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        let cell = game.World.Grid[y]?.[x];
        if (cell && cell.Ocupados.length > 0) {
            let camera_follow = game.World.Follow[follow_camera_entity];
            camera_follow.Target = cell.Ocupados[0];
            game.World.Signature[follow_camera_entity] |= Has.Follow;

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
