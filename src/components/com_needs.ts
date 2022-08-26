import {float} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export type NeedType = "Work" | "Food" | "Sleep";
export interface Needs {
    Work: number;
    Food: number;
    Sleep: number;
    DeltaWork: number;
    DeltaFood: number;
    DeltaSleep: number;
    IsBeingSatisfiedAtThisVeryMoment: boolean;
}

export function needs() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Needs;
        game.World.Needs[entity] = {
            Work: 0.5,
            Food: 1,
            Sleep: 1,
            DeltaWork: float() / 25,
            DeltaFood: float() / 25,
            DeltaSleep: float() / 25,
            IsBeingSatisfiedAtThisVeryMoment: false,
        };
    };
}
