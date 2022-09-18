import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Render2D;

export function sys_highlight(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let render = game.World.Render2D[ent];
            if (ent === game.SelectedEntity) {
                render.Color[3] = 2;
            } else {
                render.Color[3] = 1;
            }
        }
    }
}
