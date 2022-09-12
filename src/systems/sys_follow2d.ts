/**
 * # sys_follow2d
 *
 * Update the entity's position to follow another entity.
 */

import {lerp} from "../../lib/vec2.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.LocalTransform2D | Has.Follow;

export function sys_follow(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) === QUERY) {
            update(game, ent);
        }
    }
}

function update(game: Game, entity: Entity) {
    let entity_local = game.World.LocalTransform2D[entity];
    let entity_follow = game.World.Follow[entity];
    let target_entity = entity_follow.Target;
    // The target must be a top-level entity.
    let target_local = game.World.LocalTransform2D[target_entity];

    lerp(
        entity_local.Translation,
        entity_local.Translation,
        target_local.Translation,
        0.1 // stiffness
    );

    game.World.Signature[entity] |= Has.Dirty;
}
