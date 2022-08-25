import {control_player} from "../components/com_control_player.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game} from "../game.js";

export const SQUARE_LIFESPAN = 10;

export function blueprint_eraser(game: Game) {
    return [local_transform2d(), control_player("eraser"), render2d("128.png"), shift(5)];
}
