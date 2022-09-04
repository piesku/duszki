import {element} from "../../lib/random.js";
import {lifespan} from "../components/com_lifespan.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game} from "../game.js";

const sprites = ["064.png", "065.png", "066.png"];

export function blueprint_grave(game: Game) {
    return [local_transform2d(), render2d(element(sprites)), shift(0.1), lifespan(100)];
}
