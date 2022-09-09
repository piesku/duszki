import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {GridCell, Has} from "../world.js";

export interface Walk {
    DestinationTrigger: GridCell | null;
    Path: Array<GridCell>;
    Speed: number;
}

export function walk(speed: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Walk;
        game.World.Walk[entity] = {
            DestinationTrigger: null,
            Path: [],
            Speed: speed,
        };
    };
}
