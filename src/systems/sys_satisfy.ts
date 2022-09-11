import {get_translation} from "../../lib/mat2d.js";
import {query_down} from "../components/com_children.js";
import {NeedType} from "../components/com_needs.js";
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

export const BEING_SATISFIED_MASK = Has.Render2D | Has.Walk | Has.Alive;
// Duszkis are getting tired and hungry while working.
export const WORKING_MASK = Has.Render2D | Has.Walk;
export const SATISFY_THRESHOLD = 0.75;
export const LOW_SATISFY_THRESHOLD = 0.4;

function update(game: Game, entity: number, delta: number) {
    let satisfy = game.World.Satisfy[entity];
    let local = game.World.SpatialNode2D[entity];
    let pos = get_translation([0, 0], local.World);
    let y = Math.round(pos[1]);
    let x = Math.round(pos[0]);
    let cell = game.World.Grid[y]?.[x];
    if (!cell) {
        return;
    }

    let guests_at_the_door = cell.Ocupados;
    for (let guest of guests_at_the_door) {
        let need = game.World.Needs[guest];

        if (need && satisfy.NeedType === NeedType.WORK) {
            // Duszek works only when fed and rested.
            if (
                need.Value[NeedType.FOOD] > SATISFY_THRESHOLD &&
                need.Value[NeedType.SLEEP] > SATISFY_THRESHOLD
            ) {
                if (satisfy.Ocupados.length <= satisfy.Capacity) {
                    satisfy.Ocupados.push(guest);
                    game.World.Signature[guest] &= ~WORKING_MASK;
                    game.World.DuszkiWorking++;
                    need.Target[NeedType.WORK] = entity;
                    // } else if (guests_at_the_door.length > 1) {
                } else if (entity === need.Target[satisfy.NeedType]) {
                    // more than one duszek at the door, so redirect all but one to another target
                    need.Target[satisfy.NeedType] = undefined;
                }
            }
        } else if (need && need.Value[satisfy.NeedType] < SATISFY_THRESHOLD) {
            if (satisfy.Ocupados.length < satisfy.Capacity) {
                // console.log(
                //     `Domek ${satisfy.NeedType} ocupados: ${satisfy.Ocupados.length} / ${satisfy.Capacity}`
                // );
                satisfy.Ocupados.push(guest);
                game.World.Signature[guest] &= ~BEING_SATISFIED_MASK;
                need.Target[satisfy.NeedType] = entity;
                // } else if (guests_at_the_door.length > 1) {
            } else if (entity === need.Target[satisfy.NeedType]) {
                // more than one duszek at the door, so redirect all but one to another target
                need.Target[satisfy.NeedType] = undefined;
            }
        }
    }
    for (let guest of satisfy.Ocupados) {
        let need = game.World.Needs[guest];
        // Duszek stops working when hungry or tired.
        if (satisfy.NeedType === NeedType.WORK) {
            if (
                need.Value[NeedType.FOOD] < LOW_SATISFY_THRESHOLD ||
                need.Value[NeedType.SLEEP] < LOW_SATISFY_THRESHOLD
            ) {
                satisfy.Ocupados.splice(satisfy.Ocupados.indexOf(guest), 1);
                game.World.Signature[guest] |= WORKING_MASK;
                game.World.DuszkiWorking--;
            }
        } else {
            need.Value[satisfy.NeedType] += need.Delta[satisfy.NeedType] * delta * 4;

            if (need.Value[satisfy.NeedType] >= 1) {
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
