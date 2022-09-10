import {hsva_to_vec4} from "../../lib/color.js";
import {float} from "../../lib/random.js";
import {control_ai} from "../components/com_control_ai.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {move2d} from "../components/com_move2d.js";
import {needs} from "../components/com_needs.js";
import {render2d, shift} from "../components/com_render2d.js";
import {walk} from "../components/com_walk.js";
import {Game} from "../game.js";

export function blueprint_duszek(game: Game) {
    return [
        local_transform2d(),
        render2d("126.png", hsva_to_vec4(float(0, 1), float(0.6, 0.8), float(0.6, 0.8), 1)),
        shift(1),
        control_ai(),
        walk(float(2, 2.5)),
        move2d(1, 0),
        needs(),
    ];
}
