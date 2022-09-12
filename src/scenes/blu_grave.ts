import {element} from "../../lib/random.js";
import {lifespan} from "../components/com_lifespan.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game} from "../game.js";

export const GraveSprites = ["064.png", "066.png"];

export function blueprint_grave(
    game: Game,
    no_lifespan: boolean = false,
    sprite = element(GraveSprites)
) {
    let blu = [local_transform2d(), render2d(sprite), shift(0.1)];
    if (!no_lifespan) {
        blu.push(lifespan(60));
    }
    return blu;
}
