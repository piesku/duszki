/**
 * # sys_move
 *
 * Move and rotate entities.
 */

import {Vec2} from "../../lib/math.js";
import * as vec2 from "../../lib/vec2.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.LocalTransform2D | Has.Move2D | Has.Dirty;

export function sys_move2d(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

const direction: Vec2 = [0, 0];

function update(game: Game, entity: Entity, delta: number) {
    let local = game.World.LocalTransform2D[entity];
    let move = game.World.Move2D[entity];

    if (move.Direction[0] || move.Direction[1]) {
        // Directions are given in the world space and the entity must be
        // top-level, too.

        // Scale by the distance traveled in this tick.
        vec2.scale(direction, move.Direction, move.MoveSpeed * delta);
        vec2.add(local.Translation, local.Translation, direction);

        move.Direction[0] = 0;
        move.Direction[1] = 0;
    }
}
