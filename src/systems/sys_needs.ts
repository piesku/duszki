import {get_translation} from "../../lib/mat2d.js";
import {element} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Needs;
const SATISFY_QUERY = Has.Satisfy;

let food_destination: Entity[] = [];
let work_destination: Entity[] = [];
let sleep_destination: Entity[] = [];

export function sys_needs(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & SATISFY_QUERY) == SATISFY_QUERY) {
            let satisfy = game.World.Satisfy[i];
            let local = game.World.SpatialNode2D[i];
            let coords = get_translation([0, 0], local.World);
            if (satisfy.NeedType == "food") {
                food_destination.push(i);
            } else if (satisfy.NeedType == "work") {
                work_destination.push(i);
            } else if (satisfy.NeedType == "sleep") {
                sleep_destination.push(i);
            }
        }
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: number, delta: number) {
    let needs = game.World.Needs[entity];

    if (!needs.FoodTargetCoords) {
        needs.FoodTargetCoords = element(food_destination);
    }
    if (!needs.WorkTargetCoords) {
        needs.WorkTargetCoords = element(work_destination);
    }
    if (!needs.SleepTargetCoords) {
        needs.SleepTargetCoords = element(sleep_destination);
    }

    // needs.Work -= needs.DeltaWork * delta;
    needs.food -= needs.delta_food * delta;
    needs.sleep -= needs.delta_sleep * delta;
}
