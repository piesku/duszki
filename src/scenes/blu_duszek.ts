import {float} from "../../lib/random.js";
import {control_ai} from "../components/com_control_ai.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {move2d} from "../components/com_move2d.js";
import {order, render2d} from "../components/com_render2d.js";
import {walk} from "../components/com_walk.js";
import {Game} from "../game.js";

export function blueprint_duszek(game: Game) {
    return [
        local_transform2d(),
        render2d("125.png"),
        order(0.5),
        control_ai(),
        walk(),
        move2d(float(2, 4), 0),
    ];
}
