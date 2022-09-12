/**
 * # Move2D
 *
 * The `Move2D` component allows the entity to move in 2D space.
 */

import {Vec2} from "../../lib/math.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Move2D {
    /** Movement speed, in units per second. */
    MoveSpeed: number;
    Direction: Vec2;
}

/**
 * Add `Move2D` to an entity.
 *
 * @param move_speed - Movement speed in units per second.
 */
export function move2d(move_speed: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Move2D;
        game.World.Move2D[entity] = {
            MoveSpeed: move_speed,
            Direction: [0, 0],
        };
    };
}
