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

const BEING_SATISFIED_MASK = Has.Render2D | Has.Walk | Has.Needs | Has.ControlAi;

function update(game: Game, entity: number, delta: number) {
    let satisfy = game.World.Satisfy[entity];
    let local = game.World.SpatialNode2D[entity];
    let pos = get_translation([0, 0], local.World);
    let guests_at_the_door = game.World.Grid[pos[1]][pos[0]].Ocupados;

    for (let guest of guests_at_the_door) {
        let need = game.World.Needs[guest];
        if (need && need[satisfy.NeedType] < 0.9) {
            console.log(`duszek w domku, aktualny ${satisfy.NeedType}: ${need[satisfy.NeedType]}`);
            satisfy.Ocupados.push(guest);
            game.World.Signature[guest] &= ~BEING_SATISFIED_MASK;
        }
    }

    for (let guest of satisfy.Ocupados) {
        console.log(`duszek uzupełnia ${satisfy.NeedType} w domku`);
        let need = game.World.Needs[guest];
        need[satisfy.NeedType] += need[`Delta${satisfy.NeedType}`] * delta * 4;

        if (need[satisfy.NeedType] >= 1) {
            console.log(`${satisfy.NeedType} wymaksowane, wykurwiam w tango`);
            satisfy.Ocupados.splice(satisfy.Ocupados.indexOf(guest), 1);
            game.World.Signature[guest] |= BEING_SATISFIED_MASK;
        }
    }
}
