import {clamp} from "../../lib/number.js";
import {element} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Needs | Has.LocalTransform2D;
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
    let local = game.World.LocalTransform2D[entity];
    let needs = game.World.Needs[entity];

    if (!needs.Target[NeedType.FOOD]) {
        needs.Target[NeedType.FOOD] = element(food_destination);
    }
    if (!needs.Target[NeedType.WORK]) {
        needs.Target[NeedType.WORK] = element(work_destination);
    }
    if (!needs.Target[NeedType.SLEEP]) {
        needs.Target[NeedType.SLEEP] = element(sleep_destination);
    }

    // needs.Work -= needs.DeltaWork * delta;
    needs.Value[NeedType.FOOD] -= needs.Delta[NeedType.FOOD] * delta;
    needs.Value[NeedType.SLEEP] -= needs.Delta[NeedType.SLEEP] * delta;

    let x = Math.round(local.Translation[0]);
    let y = Math.round(local.Translation[1]);

    needs.Value[NeedType.HAPPY] -= needs.Delta[NeedType.HAPPY] * delta;
    if (game.World.Grid[y + 1]?.[x].Pleasant) {
        needs.Value[NeedType.HAPPY] += needs.Delta[NeedType.HAPPY] * delta;
    }
    if (game.World.Grid[y][x + 1]?.Pleasant) {
        needs.Value[NeedType.HAPPY] += needs.Delta[NeedType.HAPPY] * delta;
    }
    if (game.World.Grid[y - 1]?.[x].Pleasant) {
        needs.Value[NeedType.HAPPY] += needs.Delta[NeedType.HAPPY] * delta;
    }
    if (game.World.Grid[y][x - 1]?.Pleasant) {
        needs.Value[NeedType.HAPPY] += needs.Delta[NeedType.HAPPY] * delta;
    }
    needs.Value[NeedType.HAPPY] = clamp(0, 1, needs.Value[NeedType.HAPPY]);

    game.FrameStats[NeedType.HAPPY] += needs.Value[NeedType.HAPPY];
    game.FrameStats[NeedType.FOOD] += needs.Value[NeedType.FOOD];
    game.FrameStats[NeedType.SLEEP] += needs.Value[NeedType.SLEEP];
}
