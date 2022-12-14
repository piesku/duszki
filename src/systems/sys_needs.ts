import {clamp} from "../../lib/number.js";
import {element} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {LOW_SATISFY_THRESHOLD} from "./sys_satisfy.js";

const QUERY = Has.Needs | Has.Alive | Has.LocalTransform2D;
const SATISFY_QUERY = Has.Satisfy;

let food_destination: Entity[] = [];
let work_destination: Entity[] = [];
let sleep_destination: Entity[] = [];

export function sys_needs(game: Game, delta: number) {
    food_destination = [];
    work_destination = [];
    sleep_destination = [];

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & SATISFY_QUERY) == SATISFY_QUERY) {
            let satisfy = game.World.Satisfy[i];
            if (satisfy.NeedType == NeedType.FOOD) {
                food_destination.push(i);
                game.FrameStats.RestaurantSeats += satisfy.Capacity;
            } else if (satisfy.NeedType == NeedType.WORK) {
                work_destination.push(i);
                game.FrameStats.Workplaces += satisfy.Capacity;
            } else if (satisfy.NeedType == NeedType.SLEEP) {
                sleep_destination.push(i);
                game.FrameStats.Beds += satisfy.Capacity;
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

    needs.Value[NeedType.FOOD] -= needs.Delta[NeedType.FOOD] * delta;
    needs.Value[NeedType.SLEEP] -= needs.Delta[NeedType.SLEEP] * delta;

    let x = Math.round(local.Translation[0]);
    let y = Math.round(local.Translation[1]);

    needs.Value[NeedType.HAPPY] -= needs.Delta[NeedType.HAPPY] * delta;
    // check 8 neighbours
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (game.World.Grid[y + i]?.[x + j]?.Pleasant) {
                needs.Value[NeedType.HAPPY] += needs.Delta[NeedType.HAPPY] * delta;
            }
        }
    }
    needs.Value[NeedType.HAPPY] = clamp(needs.Value[NeedType.HAPPY]);

    game.FrameStats[NeedType.HAPPY] += clamp(needs.Value[NeedType.HAPPY]);
    if (needs.Value[NeedType.HAPPY] <= LOW_SATISFY_THRESHOLD) {
        game.FrameStats.DuszkiUnhappy++;
    }

    game.FrameStats[NeedType.FOOD] += clamp(needs.Value[NeedType.FOOD]);
    if (needs.Value[NeedType.FOOD] <= LOW_SATISFY_THRESHOLD) {
        game.FrameStats.DuszkiHungry++;
    }

    game.FrameStats[NeedType.SLEEP] += clamp(needs.Value[NeedType.SLEEP]);
    if (needs.Value[NeedType.SLEEP] <= LOW_SATISFY_THRESHOLD) {
        game.FrameStats.DuszkiTired++;
    }
}
