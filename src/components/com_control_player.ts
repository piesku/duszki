/**
 * @module components/com_control_player
 */

import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Kind: "road" | "tree" | "building" | "eraser";
}

export function control_player(kind: ControlPlayer["Kind"]) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Kind: kind,
        };
    };
}
