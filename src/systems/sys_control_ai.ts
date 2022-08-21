import {integer} from "../../lib/random.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Walk;

export function sys_control_ai(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let walk = game.World.Walk[ent];
            if (walk.DestinationTrigger === null && walk.Path.length === 0) {
                walk.DestinationTrigger = [
                    integer(0, game.World.Height - 1),
                    integer(0, game.World.Width - 1),
                ];
            }
        }
    }
}
