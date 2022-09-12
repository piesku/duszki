/**
 * # Lifespan
 *
 * The `Lifespan` component allows the entity to autodestruct after a certain
 * time. Upon destruction, the entity can emit an `Action`.
 */

import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Lifespan {
    Remaining: number;
}

/**
 * Add `Lifespan` to an entity.
 *
 * @param remaining How long until the entity is destroyed (in seconds).
 */
export function lifespan(remaining: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Lifespan;
        game.World.Lifespan[entity] = {
            Remaining: remaining,
        };
    };
}
