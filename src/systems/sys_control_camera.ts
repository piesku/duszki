import {clamp} from "../../lib/number.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Camera2D | Has.LocalTransform2D;
let wheel_y_clamped = 0;

export function sys_control_camera(game: Game, delta: number) {
    if (game.InputDelta["WheelY"]) {
        wheel_y_clamped = clamp(-1000, 500, wheel_y_clamped + game.InputDelta["WheelY"]);
        let zoom = 4 ** (wheel_y_clamped / -500);
        if (0.85 < zoom && zoom < 1.15) {
            zoom = 1;
        }
        game.UnitSize = 16 * zoom;
        game.ViewportResized = true;
    }

    if (game.InputDistance["Mouse0"] > 5) {
        document.body.classList.add("grabbing");
        for (let ent = 0; ent < game.World.Signature.length; ent++) {
            if ((game.World.Signature[ent] & QUERY) === QUERY) {
                let local = game.World.LocalTransform2D[ent];
                local.Translation[0] -= game.InputDelta["MouseX"] / game.UnitSize;
                local.Translation[1] += game.InputDelta["MouseY"] / game.UnitSize;
                game.World.Signature[ent] |= Has.Dirty;
            }
        }
    }

    if (game.InputDelta["Mouse0"] === -1) {
        document.body.classList.remove("grabbing");
    }
}
