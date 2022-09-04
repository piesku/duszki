import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {element} from "../../lib/random.js";
import {Action, dispatch} from "../actions.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {SATISFY_THRESHOLD} from "./sys_satisfy.js";

const QUERY = Has.ControlAi | Has.Walk | Has.Needs;

let walkables: Vec2[] = [];

let mortality_check_interval = 1;
let time_since_last_check = 0;
let deaths_since_last_check = 0;

export function sys_control_ai(game: Game, delta: number) {
    walkables = [];
    for (let y = 0; y < game.World.Grid.length; y++) {
        for (let x = 0; x < game.World.Grid[y].length; x++) {
            if (game.World.Grid[y][x].Walkable) {
                walkables.push([x, y]);
            }
        }
    }

    let duszki_count = game.World.DuszkiAlive;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }

    deaths_since_last_check += duszki_count - game.World.DuszkiAlive;

    // Compute mortality CMA.
    time_since_last_check += delta;
    if (time_since_last_check > mortality_check_interval) {
        game.World.Age += time_since_last_check;
        game.World.Mortality += (deaths_since_last_check - game.World.Mortality) / game.World.Age;
        deaths_since_last_check = 0;
        time_since_last_check = 0;
    }
}

function update(game: Game, entity: number, delta: number) {
    let walk = game.World.Walk[entity];
    let needs = game.World.Needs[entity];
    let local = game.World.LocalTransform2D[entity];

    if (needs.food < 0.001) {
        console.log("duszek umar z głodu");
        dispatch(game, Action.DuszekDied, local.Translation);

        destroy_all(game.World, entity);
        return;
    }

    if (needs.sleep < 0.001) {
        console.log("duszek umar z wycieczenia");
        dispatch(game, Action.DuszekDied, local.Translation);
        destroy_all(game.World, entity);
        return;
    }

    if (walkables.length > 0 && walk.DestinationTrigger === null && walk.Path.length === 0) {
        if (needs.food < SATISFY_THRESHOLD && needs.FoodTargetCoords && needs.food < needs.sleep) {
            let destination_satisfier_mask = game.World.Signature[needs.FoodTargetCoords];
            let destination_satisfier = game.World.Satisfy[needs.FoodTargetCoords];
            let spiatial = game.World.SpatialNode2D[needs.FoodTargetCoords];
            if (
                (destination_satisfier_mask & Has.Satisfy) == Has.Satisfy &&
                destination_satisfier?.NeedType === "food"
            ) {
                walk.DestinationTrigger = get_translation([0, 0], spiatial.World);
            } else {
                needs.FoodTargetCoords = undefined;
            }
        } else if (
            needs.sleep < SATISFY_THRESHOLD &&
            needs.SleepTargetCoords &&
            needs.sleep < needs.food
        ) {
            let destination_satisfier_mask = game.World.Signature[needs.SleepTargetCoords];
            let destination_satisfier = game.World.Satisfy[needs.SleepTargetCoords];
            let spiatial = game.World.SpatialNode2D[needs.SleepTargetCoords];
            if (
                (destination_satisfier_mask & Has.Satisfy) == Has.Satisfy &&
                destination_satisfier?.NeedType === "sleep"
            ) {
                walk.DestinationTrigger = get_translation([0, 0], spiatial.World);
            } else {
                needs.SleepTargetCoords = undefined;
            }
        } else if (
            needs.food > SATISFY_THRESHOLD &&
            needs.sleep > SATISFY_THRESHOLD &&
            needs.WorkTargetCoords
        ) {
            let destination_satisfier_mask = game.World.Signature[needs.WorkTargetCoords];
            let destination_satisfier = game.World.Satisfy[needs.WorkTargetCoords];
            let spiatial = game.World.SpatialNode2D[needs.WorkTargetCoords];
            if (
                (destination_satisfier_mask & Has.Satisfy) == Has.Satisfy &&
                destination_satisfier?.NeedType === "work"
            ) {
                walk.DestinationTrigger = get_translation([0, 0], spiatial.World);
            } else {
                needs.WorkTargetCoords = undefined;
            }
        } else {
            walk.DestinationTrigger = element(walkables);
        }
    }
}
