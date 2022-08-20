import {Vec2} from "../../lib/math.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Walk {
    DestinationTrigger: Vec2 | null;
    Path: Array<Vec2>;
}

export function walk() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Walk;
        game.World.Walk[entity] = {
            DestinationTrigger: null,
            Path: [],
        };
    };
}
