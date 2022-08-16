import {control_player} from "../components/com_control_player.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {order, render2d} from "../components/com_render2d.js";
import {Game} from "../game.js";

export function blueprint_cursor(game: Game) {
    return [local_transform2d(), control_player(), render2d("060.png"), order(1)];
}
