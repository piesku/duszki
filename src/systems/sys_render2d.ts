/**
 * # sys_render2d
 *
 * Render all sprites in the world using the WebGL renderer.
 *
 * Sprites are rendered on instanced quads, which means that they are all
 * rendered in a single draw call.
 */

import {map_range} from "../../lib/number.js";
import {
    GL_ARRAY_BUFFER,
    GL_COLOR_BUFFER_BIT,
    GL_DEPTH_BUFFER_BIT,
    GL_FRAMEBUFFER,
    GL_SCISSOR_TEST,
    GL_STREAM_DRAW,
    GL_TEXTURE0,
    GL_TEXTURE_2D,
} from "../../lib/webgl.js";
import {FLOATS_PER_INSTANCE} from "../../materials/layout2d.js";
import {Camera2D} from "../components/com_camera2d.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export function sys_render2d(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        // The shader queries the instance data for presence of the following components.
        let signature = game.World.Signature[ent] & (Has.Render2D | Has.SpatialNode2D);
        let signature_offset = ent * FLOATS_PER_INSTANCE + 7;
        if (game.World.InstanceData[signature_offset] !== signature) {
            game.World.InstanceData[signature_offset] = signature;
        }

        if (signature & Has.Render2D) {
            let render = game.World.Render2D[ent];
            let shift_offset = ent * FLOATS_PER_INSTANCE + 6;
            if (signature & Has.SpatialNode2D) {
                let spatial = game.World.SpatialNode2D[ent];
                if (spatial.Parent !== undefined) {
                    let parent_spatial = game.World.SpatialNode2D[spatial.Parent];
                    let shift = (parent_spatial.World[5] - render.Shift) / game.World.Height;
                    game.World.InstanceData[shift_offset] = map_range(shift, -1, 1, 0.5, -0.5);
                } else {
                    let shift = (spatial.World[5] - render.Shift) / game.World.Height;
                    game.World.InstanceData[shift_offset] = map_range(shift, -1, 1, 0.5, -0.5);
                }
            } else {
                let local = game.World.LocalTransform2D[ent];
                let shift = (local.Translation[1] - render.Shift) / game.World.Height;
                game.World.InstanceData[shift_offset] = map_range(shift, -1, 1, 0.5, -0.5);
            }
        }
    }

    game.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
    game.Gl.bindBuffer(GL_ARRAY_BUFFER, game.InstanceBuffer);
    game.Gl.bufferData(GL_ARRAY_BUFFER, game.World.InstanceData, GL_STREAM_DRAW);

    {
        game.Gl.clearColor(0, 0, 0, 0);
        game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // Main camera.
        let camera_entity = game.Cameras[0];
        let camera = game.World.Camera2D[camera_entity];
        game.Gl.viewport(0, 0, camera.ViewportWidth, camera.ViewportHeight);
        render_all(game, camera);
    }

    {
        game.Gl.enable(GL_SCISSOR_TEST);
        game.Gl.scissor(90, 90, 120, 120);
        game.Gl.clearColor(0, 0, 0, 1);
        game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        game.Gl.scissor(100, 100, 100, 100);
        game.Gl.clearColor(181 / 255, 176 / 255, 222 / 255, 1);
        game.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        game.Gl.disable(GL_SCISSOR_TEST);

        // Follow camera.
        let camera_entity = game.Cameras[1];
        let camera = game.World.Camera2D[camera_entity];
        game.Gl.viewport(100, 100, 100, 100);
        render_all(game, camera);
    }
}

function render_all(game: Game, eye: Camera2D) {
    let material = game.MaterialRender2D;
    let sheet = game.Spritesheet;

    game.Gl.useProgram(material.Program);
    game.Gl.uniformMatrix3x2fv(material.Locations.Pv, false, eye.Pv);

    game.Gl.activeTexture(GL_TEXTURE0);
    game.Gl.bindTexture(GL_TEXTURE_2D, sheet.Texture);
    game.Gl.uniform1i(material.Locations.SheetTexture, 0);
    game.Gl.uniform2f(material.Locations.SheetSize, sheet.Width, sheet.Height);

    game.Gl.drawArraysInstanced(material.Mode, 0, 4, game.World.Signature.length);
}
