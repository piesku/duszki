import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {element} from "../../lib/random.js";
import {Action, dispatch} from "../actions.js";
import {destroy_all} from "../components/com_children.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";
import {GridCell, Has} from "../world.js";
import {SATISFY_THRESHOLD} from "./sys_satisfy.js";

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
    let local = game.World.LocalTransform2D[entity];
    let control = game.World.ControlAi[entity];

    if (DEBUG) {
        let render = game.World.Render2D[entity];
        render.Color[3] = needs.Value[NeedType.HAPPY];
    }

    move.MoveSpeed = walk.Speed * needs.Value[NeedType.HAPPY];

    if (needs.Value[NeedType.FOOD] < 0.001) {
        console.log("duszek umar z głodu");
        dispatch(game, Action.DuszekDied, [entity, local.Translation]);
        destroy_all(game.World, entity);
        return;
    }

    if (needs.Value[NeedType.SLEEP] < 0.001) {
        console.log("duszek umar z wycieczenia");
        dispatch(game, Action.DuszekDied, [entity, local.Translation]);
        destroy_all(game.World, entity);
        return;
    }

    if (walkables.length > 0 && walk.DestinationTrigger === null && walk.Path.length === 0) {
        let food_target = needs.Target[NeedType.FOOD];
        let sleep_target = needs.Target[NeedType.SLEEP];
        let work_target = needs.Target[NeedType.WORK];

        if (
            needs.Value[NeedType.FOOD] < SATISFY_THRESHOLD &&
            food_target &&
            needs.Value[NeedType.FOOD] < needs.Value[NeedType.SLEEP]
        ) {
            let destination_satisfier_mask = game.World.Signature[food_target];
            let destination_satisfier = game.World.Satisfy[food_target];
            let spiatial = game.World.SpatialNode2D[food_target];
            if (
                destination_satisfier_mask & Has.Satisfy &&
                destination_satisfier?.NeedType === NeedType.FOOD
            ) {
                get_translation(destination_position, spiatial.World);
                let x = Math.round(destination_position[0]);
                let y = Math.round(destination_position[1]);
                walk.DestinationTrigger = game.World.Grid[y][x];
                control.Says = "I'm hungry!";
            } else {
                needs.Target[NeedType.FOOD] = undefined;
            }
        } else if (
            needs.Value[NeedType.SLEEP] < SATISFY_THRESHOLD &&
            sleep_target &&
            needs.Value[NeedType.SLEEP] < needs.Value[NeedType.FOOD]
        ) {
            let destination_satisfier_mask = game.World.Signature[sleep_target];
            let destination_satisfier = game.World.Satisfy[sleep_target];
            let spiatial = game.World.SpatialNode2D[sleep_target];
            if (
                destination_satisfier_mask & Has.Satisfy &&
                destination_satisfier?.NeedType === NeedType.SLEEP
            ) {
                get_translation(destination_position, spiatial.World);
                let x = Math.round(destination_position[0]);
                let y = Math.round(destination_position[1]);
                walk.DestinationTrigger = game.World.Grid[y][x];
                control.Says = "I'm tired!";
            } else {
                needs.Target[NeedType.SLEEP] = undefined;
            }
        } else if (
            needs.Value[NeedType.FOOD] > SATISFY_THRESHOLD &&
            needs.Value[NeedType.SLEEP] > SATISFY_THRESHOLD &&
            work_target
        ) {
            let destination_satisfier_mask = game.World.Signature[work_target];
            let destination_satisfier = game.World.Satisfy[work_target];
            let spiatial = game.World.SpatialNode2D[work_target];
            if (
                destination_satisfier_mask & Has.Satisfy &&
                destination_satisfier?.NeedType === NeedType.WORK
            ) {
                get_translation(destination_position, spiatial.World);
                let x = Math.round(destination_position[0]);
                let y = Math.round(destination_position[1]);
                walk.DestinationTrigger = game.World.Grid[y][x];
                control.Says = "Looking for work...";
            } else {
                needs.Target[NeedType.WORK] = undefined;
            }
        } else {
            console.log("z jakiegoś powodu duszek is wandering around without a purpose");
            walk.DestinationTrigger = element(walkables);
            control.Says = "I'm bored!";
        }
    }
}
