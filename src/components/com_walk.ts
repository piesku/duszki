import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Walk {
    CurrentNode: number;
    DestinationNode: number | null;
    Path: Array<number>;
}

export function walk(current_node: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Walk;
        game.World.Walk[entity] = {
            CurrentNode: current_node,
            DestinationNode: null,
            Path: [],
        };
    };
}
