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
// Duszkis are getting tired and hungry while working.
const WORKING_MASK = Has.Render2D | Has.Walk | Has.ControlAi;
const SATISFY_THRESHOLD = 0.75;
const LOW_SATISFY_THRESHOLD = 0.4;

function update(game: Game, entity: number, delta: number) {
    let satisfy = game.World.Satisfy[entity];
    let local = game.World.SpatialNode2D[entity];
    let pos = get_translation([0, 0], local.World);
    let y = Math.round(pos[1]);
    let x = Math.round(pos[0]);
    let guests_at_the_door = game.World.Grid[y][x].Ocupados;

    for (let guest of guests_at_the_door) {
        let need = game.World.Needs[guest];
        if (need && satisfy.NeedType === "Work") {
            // Duszek works only when fed and rested.
            if (need.Food > SATISFY_THRESHOLD && need.Sleep > SATISFY_THRESHOLD) {
                satisfy.Ocupados.push(guest);
                game.World.Signature[guest] &= ~WORKING_MASK;
                game.WorkingDuszkiCount++;
            }
        } else if (need && need[satisfy.NeedType] < SATISFY_THRESHOLD) {
            if (satisfy.Ocupados.length < satisfy.Capacity) {
                // console.log(
                //     `Domek ${satisfy.NeedType} ocupados: ${satisfy.Ocupados.length} / ${satisfy.Capacity}`
                // );
                satisfy.Ocupados.push(guest);
                game.World.Signature[guest] &= ~BEING_SATISFIED_MASK;
            }
        }
    }
    for (let guest of satisfy.Ocupados) {
        let need = game.World.Needs[guest];
        // Duszek stops working when hungry or tired.
        if (satisfy.NeedType === "Work") {
            if (need.Food < LOW_SATISFY_THRESHOLD || need.Sleep < LOW_SATISFY_THRESHOLD) {
                satisfy.Ocupados.splice(satisfy.Ocupados.indexOf(guest), 1);
                game.World.Signature[guest] |= WORKING_MASK;
                game.WorkingDuszkiCount--;
            }
        } else {
            need[satisfy.NeedType] += need[`Delta${satisfy.NeedType}`] * delta * 4;

            if (need[satisfy.NeedType] >= 1) {
                satisfy.Ocupados.splice(satisfy.Ocupados.indexOf(guest), 1);
                game.World.Signature[guest] |= BEING_SATISFIED_MASK;
            }
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
