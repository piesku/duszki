import {pointer_viewport} from "../../lib/input.js";
import {Vec2} from "../../lib/math.js";
import {clamp} from "../../lib/number.js";
import {scale, subtract} from "../../lib/vec2.js";
import {viewport_to_world} from "../components/com_camera2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const pointer_position: Vec2 = [0, 0];
let wheel_y_clamped = 0;

export function sys_control_camera_main(game: Game, delta: number) {
    let camera_entity = game.Cameras[0];
    if (camera_entity === undefined) {
        // This system requires the main camera to exist.
        return;
    }

    let camera = game.World.Camera2D[camera_entity];
    let camera_local = game.World.LocalTransform2D[camera_entity];

    if (game.InputDelta["WheelY"]) {
        let cur_zoom = 4 ** (wheel_y_clamped / -500);
        wheel_y_clamped = clamp(wheel_y_clamped + game.InputDelta["WheelY"], -1000, 500);
        let new_zoom = 4 ** (wheel_y_clamped / -500);

        game.UnitSize = 16 * new_zoom;
        game.ViewportResized = true;

        if (pointer_viewport(game, pointer_position)) {
            // Position under the mouse cursor at cur_zoom.
            viewport_to_world(pointer_position, camera, pointer_position);

            // Offset from pointer to camera position.
            let offset: Vec2 = [0, 0];
            subtract(offset, pointer_position, camera_local.Translation);
            // Scale the offset to the new zoom.
            scale(offset, offset, 1 - cur_zoom / new_zoom);

            // Offset the camera position so that the mouse cursor is over the
            // same position at the new zoom.
            camera_local.Translation[0] += offset[0];
            camera_local.Translation[1] += offset[1];
            game.World.Signature[camera_entity] |= Has.Dirty;
        }
    }

    if (game.InputDistance["Mouse2"] > 5) {
        document.body.classList.add("grabbing");
        camera_local.Translation[0] -= game.InputDelta["MouseX"] / game.UnitSize;
        camera_local.Translation[1] += game.InputDelta["MouseY"] / game.UnitSize;
        game.World.Signature[camera_entity] |= Has.Dirty;
    }

    if (game.InputDelta["Mouse2"] === -1) {
        document.body.classList.remove("grabbing");
    }
}
