import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Needs;

export function sys_needs(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: number, delta: number) {
    let needs = game.World.Needs[entity];
    // needs.Work -= needs.DeltaWork * delta;
    needs.Food -= needs.DeltaFood * delta;
    needs.Sleep -= needs.DeltaSleep * delta;
}
