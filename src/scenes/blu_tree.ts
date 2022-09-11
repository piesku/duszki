import {element} from "../../lib/random.js";
import {control_player} from "../components/com_control_player.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game} from "../game.js";

export const TREE_TILES = ["015.png"];

export function blueprint_tree(game: Game) {
    return [local_transform2d(), render2d(element(TREE_TILES))];
}

export function blueprint_tree_phantom(game: Game) {
    return [local_transform2d(), control_player("tree"), render2d(element(TREE_TILES)), shift(5)];
}
