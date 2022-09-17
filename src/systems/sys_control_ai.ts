import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {element} from "../../lib/random.js";
import {Action, dispatch} from "../actions.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";
import {GridCell, Has} from "../world.js";
import {LOW_SATISFY_THRESHOLD, SATISFY_THRESHOLD} from "./sys_satisfy.js";

const QUERY = Has.ControlAi | Has.Walk | Has.Needs | Has.Move2D;

let walkables: GridCell[] = [];

export function sys_control_ai(game: Game, delta: number) {
    walkables = [];
    for (let y = 0; y < game.World.Grid.length; y++) {
        for (let x = 0; x < game.World.Grid[y].length; x++) {
            if (game.World.Grid[y][x].Walkable) {
                walkables.push(game.World.Grid[y][x]);
            }
        }
    }

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }
}

const destination_position: Vec2 = [0, 0];

function update(game: Game, entity: number, delta: number) {
    let walk = game.World.Walk[entity];
    let move = game.World.Move2D[entity];
    let needs = game.World.Needs[entity];
    let control = game.World.ControlAi[entity];

    move.MoveSpeed = walk.Speed * needs.Value[NeedType.HAPPY];

    if (needs.Value[NeedType.FOOD] < 0.001) {
        dispatch(game, Action.DuszekDied, [entity]);
        return;
    }

    if (needs.Value[NeedType.SLEEP] < 0.001) {
        dispatch(game, Action.DuszekDied, [entity]);
        return;
    }

    control.TimeSinceDecision += delta;
    if (control.TimeSinceDecision > control.DecisionInterval) {
        let current_destination = walk.Path[walk.Path.length - 1];

        if (
            needs.Value[NeedType.FOOD] < SATISFY_THRESHOLD &&
            needs.Value[NeedType.FOOD] < needs.Value[NeedType.SLEEP]
        ) {
            control.Says = "I'm hungry!";
            let food_target = needs.Target[NeedType.FOOD];
            if (
                food_target &&
                game.World.Signature[food_target] & Has.Satisfy &&
                game.World.Satisfy[food_target].NeedType === NeedType.FOOD
            ) {
                let target_spatial = game.World.SpatialNode2D[food_target];
                get_translation(destination_position, target_spatial.World);
                let x = Math.round(destination_position[0]);
                let y = Math.round(destination_position[1]);
                let cell = game.World.Grid[y][x];
                if (current_destination === undefined) {
                    walk.DestinationTrigger = cell;
                    control.TimeSinceDecision = 0;
                } else if (
                    cell !== current_destination &&
                    needs.Value[NeedType.FOOD] < LOW_SATISFY_THRESHOLD
                ) {
                    walk.DestinationTrigger = cell;
                    control.TimeSinceDecision = 0;
                }
            } else {
                // The target is not a valid food source.
                needs.Target[NeedType.FOOD] = undefined;
            }
        } else if (
            needs.Value[NeedType.SLEEP] < SATISFY_THRESHOLD &&
            needs.Value[NeedType.SLEEP] < needs.Value[NeedType.FOOD]
        ) {
            control.Says = "I'm tired!";
            let sleep_target = needs.Target[NeedType.SLEEP];
            if (
                sleep_target &&
                game.World.Signature[sleep_target] & Has.Satisfy &&
                game.World.Satisfy[sleep_target].NeedType === NeedType.SLEEP
            ) {
                let target_spatial = game.World.SpatialNode2D[sleep_target];
                get_translation(destination_position, target_spatial.World);
                let x = Math.round(destination_position[0]);
                let y = Math.round(destination_position[1]);
                let cell = game.World.Grid[y][x];
                if (current_destination === undefined) {
                    walk.DestinationTrigger = cell;
                    control.TimeSinceDecision = 0;
                } else if (
                    cell !== current_destination &&
                    needs.Value[NeedType.SLEEP] < LOW_SATISFY_THRESHOLD
                ) {
                    walk.DestinationTrigger = cell;
                    control.TimeSinceDecision = 0;
                }
            } else {
                needs.Target[NeedType.SLEEP] = undefined;
            }
        } else if (
            needs.Value[NeedType.FOOD] > SATISFY_THRESHOLD &&
            needs.Value[NeedType.SLEEP] > SATISFY_THRESHOLD
        ) {
            control.Says = "Looking for work...";
            let work_target = needs.Target[NeedType.WORK];
            if (
                work_target &&
                game.World.Signature[work_target] & Has.Satisfy &&
                game.World.Satisfy[work_target].NeedType === NeedType.WORK
            ) {
                let target_spatial = game.World.SpatialNode2D[work_target];
                get_translation(destination_position, target_spatial.World);
                let x = Math.round(destination_position[0]);
                let y = Math.round(destination_position[1]);
                let cell = game.World.Grid[y][x];
                if (cell !== current_destination) {
                    walk.DestinationTrigger = cell;
                    control.TimeSinceDecision = 0;
                }
            } else {
                needs.Target[NeedType.WORK] = undefined;
            }
        } else if (walkables.length > 0 && walk.Path.length === 0) {
            console.log("z jakiegoś powodu duszek is wandering around without a purpose");
            walk.DestinationTrigger = element(walkables);
            control.TimeSinceDecision = 0;
            control.Says = "I'm bored!";
        }
    }
}
