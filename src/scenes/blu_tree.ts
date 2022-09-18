import {Tile} from "../../sprites/spritesheet.js";
import {ControlPlayerKind, control_player} from "../components/com_control_player.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game} from "../game.js";

export function blueprint_tree(game: Game) {
    return [local_transform2d(), render2d(Tile.Tree)];
}

export function blueprint_tree_phantom(game: Game) {
    return [
        local_transform2d(),
        control_player(ControlPlayerKind.Tree),
        render2d(Tile.Tree),
        shift(5),
    ];
}
