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

const GROUND_TILE = "048.png";

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
            // instantiate(game, [...blueprint_square(game), copy_position(pointer_position)]);
            const width = game.World.Width;
            const x = Math.round(pointer_position[0]);
            const y = Math.round(pointer_position[1]);

            set_sprite(game, game.tile_entites[y * width + x], GROUND_TILE);
            set_sprite(game, game.tile_entites[(y + 1) * width + x], "014.png");
            set_sprite_if_empty(game, game.tile_entites[(y + 1) * width + (x - 1)], "013.png");
            set_sprite_if_empty(game, game.tile_entites[y * width + (x - 1)], "013.png");
            set_sprite_if_empty(game, game.tile_entites[(y + 1) * width + (x + 1)], "015.png");
            set_sprite_if_empty(game, game.tile_entites[y * width + (x + 1)], "015.png");
            set_sprite(game, game.tile_entites[(y + 2) * width + x], "002.png");
            set_sprite_if_empty(game, game.tile_entites[(y + 2) * width + (x + 1)], "003.png");
            set_sprite_if_empty(game, game.tile_entites[(y - 1) * width + x], "026.png");

            time_since_last_spawn = 0;
        }
    }
}

function set_sprite_if_empty(game: Game, ent: number, sprite: string) {
    if (game.World.Render2D[ent].SpriteName === "000.png") {
        set_sprite(game, ent, sprite);
    }
}
