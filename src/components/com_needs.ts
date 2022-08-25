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
}

export function needs() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Needs;
        game.World.Needs[entity] = {
            Work: 0.8,
            Food: 0.8,
            Sleep: 0.8,
            DeltaWork: float() / 10,
            DeltaFood: float() / 10,
            DeltaSleep: float() / 10,
        };
    };
}
