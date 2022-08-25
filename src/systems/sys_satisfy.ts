import {get_translation} from "../../lib/mat2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Satisfy;

export function sys_satisfy(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }
}

function update(game: Game, entity: number, delta: number) {
    let satisfy = game.World.Satisfy[entity];
    let local = game.World.SpatialNode2D[entity];

    let pos = get_translation([0, 0], local.World);

    console.log({pos});
}
