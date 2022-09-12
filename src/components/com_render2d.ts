/**
 * # Render2D
 *
 * The `Render2D` component allows an entity to be rendered in 2D space.
 */

import {Vec4} from "../../lib/math.js";
import {Entity} from "../../lib/world.js";
import {FLOATS_PER_INSTANCE} from "../../materials/layout2d.js";
import {spritesheet} from "../../sprites/spritesheet.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Render2D {
    Color: Float32Array;
    Shift: number;
}

/**
 * Add `Render2D` to an entity.
 *
 * By default, the z-order is 0. Use `order()` to change it.
 *
 * @param sprite_name The name of the sprite to render.
 * @param color The tint of the sprite.
 */
export function render2d(tile_id: number, color: Vec4 = [1, 1, 1, 1]) {
    let sprite_name = `${tile_id}.png`.padStart(7, "0");
    return (game: Game, entity: Entity) => {
        let instance_offset = entity * FLOATS_PER_INSTANCE;
        // Detail.
        game.World.InstanceData[instance_offset + 6] = 0; // z-order.
        game.World.InstanceData[instance_offset + 7] = Has.Render2D; // signature.
        // Color.
        game.World.InstanceData[instance_offset + 8] = color[0];
        game.World.InstanceData[instance_offset + 9] = color[1];
        game.World.InstanceData[instance_offset + 10] = color[2];
        game.World.InstanceData[instance_offset + 11] = color[3];
        // Sprite.
        game.World.InstanceData[instance_offset + 12] = spritesheet[sprite_name].x;
        game.World.InstanceData[instance_offset + 13] = spritesheet[sprite_name].y;
        // game.World.InstanceData[instance_offset + 14] = spritesheet[sprite_name].width;
        // game.World.InstanceData[instance_offset + 15] = spritesheet[sprite_name].height;

        game.World.Signature[entity] |= Has.Render2D;
        game.World.Render2D[entity] = {
            Color: game.World.InstanceData.subarray(instance_offset + 8, instance_offset + 12),
            Shift: 0,
        };
    };
}

export function shift(z: number) {
    return (game: Game, entity: Entity) => {
        let render = game.World.Render2D[entity];
        render.Shift = z;
    };
}

export function set_sprite(game: Game, entity: Entity, tile_id: number) {
    let sprite_name = `${tile_id}.png`.padStart(7, "0");
    let instance_offset = entity * FLOATS_PER_INSTANCE;
    game.World.InstanceData[instance_offset + 12] = spritesheet[sprite_name].x;
    game.World.InstanceData[instance_offset + 13] = spritesheet[sprite_name].y;
    // game.World.InstanceData[instance_offset + 14] = spritesheet[sprite_name].width;
    // game.World.InstanceData[instance_offset + 15] = spritesheet[sprite_name].height;
}
