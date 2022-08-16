import {float} from "../../lib/random.js";
import {control_ai} from "../components/com_control_ai.js";
import {copy_position, local_transform2d} from "../components/com_local_transform2d.js";
import {move2d} from "../components/com_move2d.js";
import {order, render2d} from "../components/com_render2d.js";
import {walk} from "../components/com_walk.js";
import {Game} from "../game.js";

export function blueprint_duszek(game: Game, origin: number) {
    return [
        local_transform2d(),
        copy_position(game.World.Navigation.Centroids[origin]),
        render2d("121.png"),
        order(0.5),
        control_ai(),
        walk(origin),
        move2d(float(2, 4), 0),
    ];
}
