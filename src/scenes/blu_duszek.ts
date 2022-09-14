import {hsva_to_vec4} from "../../lib/color.js";
import {float} from "../../lib/random.js";
import {Tile} from "../../sprites/spritesheet.js";
import {control_ai} from "../components/com_control_ai.js";
import {disable} from "../components/com_disable.js";
import {lifespan} from "../components/com_lifespan.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {move2d} from "../components/com_move2d.js";
import {needs} from "../components/com_needs.js";
import {render2d, shift} from "../components/com_render2d.js";
import {walk} from "../components/com_walk.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function blueprint_duszek(game: Game) {
    return [
        local_transform2d(),
        render2d(Tile.Duszek, hsva_to_vec4(float(0, 1), float(0.6, 0.8), float(0.6, 0.8), 1)),
        shift(1),
        control_ai(),
        walk(float(2, 2.5)),
        move2d(1),
        needs(),
        lifespan(60),
        disable(Has.Lifespan),
    ];
}
