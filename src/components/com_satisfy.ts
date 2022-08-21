import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Satisfy {
    Delta: number;
    Property: "Work" | "Food" | "Sleep";
    Ocupados: Entity[];
}

export function satisfy(property: "Work" | "Food" | "Sleep") {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Satisfy;
        game.World.Satisfy[entity] = {
            Property: property,
            Delta: 0.01,
            Ocupados: [],
        };
    };
}
