import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlAi {}

export function control_ai() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlAi;
        game.World.ControlAi[entity] = {};
    };
}
