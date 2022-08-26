import {get_translation} from "../../lib/mat2d.js";
import {query_down} from "../components/com_children.js";
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
const SATISFY_THRESHOLD = 0.9;

function update(game: Game, entity: number, delta: number) {
    let satisfy = game.World.Satisfy[entity];
    let local = game.World.SpatialNode2D[entity];
    let pos = get_translation([0, 0], local.World);
    let guests_at_the_door = game.World.Grid[pos[1]][pos[0]].Ocupados;

    for (let guest of guests_at_the_door) {
        let need = game.World.Needs[guest];
        if (need && need[satisfy.NeedType] < SATISFY_THRESHOLD) {
            if (satisfy.Ocupados.length < satisfy.Capacity) {
                console.log(
                    `duszek w domku, aktualny ${satisfy.NeedType}: ${need[satisfy.NeedType]}`
                );
                satisfy.Ocupados.push(guest);
                game.World.Signature[guest] &= ~BEING_SATISFIED_MASK;
            }
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

    let parent = local.Parent!;
    let parentIsBeingBuilt = game.World.Signature[parent] & Has.ControlPlayer;

    if (parentIsBeingBuilt) {
        return;
    }

    if (satisfy.Ocupados.length === 0) {
        for (let child_entity of query_down(game.World, parent, Has.Render2D)) {
            let render = game.World.Render2D[child_entity];
            render.Color[0] = 1;
            render.Color[1] = 1;
            render.Color[2] = 1;
        }
    } else {
        for (let child_entity of query_down(game.World, parent, Has.Render2D)) {
            let render = game.World.Render2D[child_entity];
            render.Color[0] = 1;
            render.Color[1] = 1;
            render.Color[2] = 0;
        }
    }
}
