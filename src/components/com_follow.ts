/**
 * # Follow
 *
 * The `Follow` component allows an entity to follow another entity. Only the
 * position is followed, not the rotation.
 */

import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Follow {
    /** Entity whose transform to follow. */
    Target: Entity;
}

/**
 * Add `Follow` to an entity.
 *
 * Only the position is followed, not the rotation.
 *
 * @param target Entity whose transform to follow.
 */
export function follow(target: Entity) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Follow;
        game.World.Follow[entity] = {
            Target: target,
        };
    };
}
