import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

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
            Work: 1,
            Food: 1,
            Sleep: 1,
            DeltaWork: 0.01,
            DeltaFood: 0.01,
            DeltaSleep: 0.01,
        };
    };
}
