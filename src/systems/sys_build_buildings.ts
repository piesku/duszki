import {pointer_clicked, pointer_viewport} from "../../lib/input.js";
import {Vec2} from "../../lib/math.js";
import {viewport_to_world} from "../components/com_camera2d.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

const pointer_position: Vec2 = [0, 0];
const SPAWN_INTERVAL = 0.1;
let time_since_last_spawn = 0;

export function sys_build_buildings(game: Game, delta: number) {
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

            if (time_since_last_spawn > SPAWN_INTERVAL && pointer_clicked(game, 0)) {
                time_since_last_spawn = 0;
                game.World.Signature[ent] &= ~Has.ControlPlayer;
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }
}
