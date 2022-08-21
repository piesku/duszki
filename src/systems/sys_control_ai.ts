import {integer} from "../../lib/random.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Walk | Has.Needs;

export function sys_control_ai(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }
}

function update(game: Game, entity: number, delta: number) {
    let walk = game.World.Walk[entity];
    let needs = game.World.Needs[entity];

    if (needs.Sleep < 0.01) {
        console.log("duszek umar z głodu");
        destroy_all(game.World, entity);
        return;
    }

    if (walk.DestinationTrigger === null && walk.Path.length === 0) {
        walk.DestinationTrigger = [
            integer(0, game.World.Height - 1),
            integer(0, game.World.Width - 1),
        ];
    }
}
