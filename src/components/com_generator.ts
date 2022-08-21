import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Generator {
    Id: number;
}

export function generator(id: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Generator;
        game.World.Generator[entity] = {
            Id: id,
        };
    };
}
