/**
 * @module components/com_control_player
 */

import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Kind: ControlPlayerKind;
}

export const enum ControlPlayerKind {
    Road,
    Tree,
    Building,
    Eraser,
}

export function control_player(kind: ControlPlayerKind) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Kind: kind,
        };
    };
}
