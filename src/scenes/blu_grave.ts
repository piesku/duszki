import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game} from "../game.js";

export const GraveSprites = [64, 66];

export function blueprint_grave(game: Game, xy: number) {
    return [local_transform2d(), render2d(GraveSprites[xy % GraveSprites.length]), shift(0.1)];
}
