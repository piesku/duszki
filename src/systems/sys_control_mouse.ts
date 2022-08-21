import {pointer_viewport} from "../../lib/input.js";
import {viewport_to_world} from "../components/com_camera2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_control_mouse(game: Game, delta: number) {
    if (!pointer_viewport(game, game.PointerPosition)) {
        // No mouse, no touch.
        return;
    }

    let camera_entity = game.Cameras[0];
    if (camera_entity === undefined) {
        // This system requires the main camera to exist.
        return;
    }

    let camera = game.World.Camera2D[camera_entity];
    viewport_to_world(game.PointerPosition, camera, game.PointerPosition);

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let local = game.World.LocalTransform2D[ent];
            local.Translation[0] = Math.round(game.PointerPosition[0]);
            local.Translation[1] = Math.round(game.PointerPosition[1]);
            game.World.Signature[ent] |= Has.Dirty;
        }
    }
}
