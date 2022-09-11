import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {NeedType} from "./com_needs.js";

export interface Satisfy {
    NeedType: NeedType;
    Ocupados: Entity[];
    Capacity: number;
}

export function satisfy(type: NeedType, Capacity: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Satisfy;
        game.World.Satisfy[entity] = {
            NeedType: type,
            Capacity,
            Ocupados: [],
        };
    };
}
