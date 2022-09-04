import {get_translation} from "../../lib/mat2d.js";
import {element} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {NeedType} from "../components/com_needs.js";
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
            if (satisfy.NeedType == NeedType.FOOD) {
                food_destination.push(i);
            } else if (satisfy.NeedType == NeedType.WORK) {
                work_destination.push(i);
            } else if (satisfy.NeedType == NeedType.SLEEP) {
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

    if (!needs.targets[NeedType.FOOD]) {
        needs.targets[NeedType.FOOD] = element(food_destination);
    }
    if (!needs.targets[NeedType.WORK]) {
        needs.targets[NeedType.WORK] = element(work_destination);
    }
    if (!needs.targets[NeedType.SLEEP]) {
        needs.targets[NeedType.SLEEP] = element(sleep_destination);
    }

    // needs.Work -= needs.DeltaWork * delta;
    needs.value[NeedType.FOOD] -= needs.delta[NeedType.FOOD] * delta;
    needs.value[NeedType.SLEEP] -= needs.delta[NeedType.SLEEP] * delta;
}
