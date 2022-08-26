import {float} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export type NeedType = "work" | "food" | "sleep";
export interface Needs {
    work: number;
    food: number;
    sleep: number;
    delta_work: number;
    delta_food: number;
    delta_sleep: number;
    IsBeingSatisfiedAtThisVeryMoment: boolean;
}

export function needs() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Needs;
        game.World.Needs[entity] = {
            work: 0.5,
            food: 1,
            sleep: 1,
            delta_work: float() / 25,
            delta_food: float() / 25,
            delta_sleep: float() / 25,
            IsBeingSatisfiedAtThisVeryMoment: false,
        };
    };
}
