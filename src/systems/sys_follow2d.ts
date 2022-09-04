/**
 * # sys_follow2d
 *
 * Update the entity's position to follow another entity.
 */

import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {copy, lerp} from "../../lib/vec2.js";
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

let target_position: Vec2 = [0, 0];

function update(game: Game, entity: Entity) {
    let entity_local = game.World.LocalTransform2D[entity];
    let entity_follow = game.World.Follow[entity];

    let target_entity = entity_follow.Target;
    if (game.World.Signature[target_entity] & Has.SpatialNode2D) {
        let target_spatial = game.World.SpatialNode2D[target_entity];
        get_translation(target_position, target_spatial.World);
    } else {
        let target_local = game.World.LocalTransform2D[entity_follow.Target];
        copy(target_position, target_local.Translation);
    }

    lerp(
        entity_local.Translation,
        entity_local.Translation,
        target_position,
        entity_follow.Stiffness
    );

    game.World.Signature[entity] |= Has.Dirty;
}
