/**
 * # sys_draw2d
 *
 * Draw 2D [primitives](com_draw.html) in the 2D scene using the Context2D API.
 */

import {DrawKind} from "../components/com_draw.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.SpatialNode2D | Has.Draw;

export function sys_draw2d(game: Game, delta: number) {
    let camera_entity = game.Cameras[0];
    if (camera_entity === undefined) {
        return;
    }

    let camera = game.World.Camera2D[camera_entity];

    game.BackgroundContext.resetTransform();
    game.BackgroundContext.fillStyle = "#666";
    game.BackgroundContext.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);
    game.BackgroundContext.transform(
        (camera.Pv[0] * game.ViewportWidth) / 2,
        (-camera.Pv[1] * game.ViewportHeight) / 2,
        (-camera.Pv[2] * game.ViewportWidth) / 2,
        (camera.Pv[3] * game.ViewportHeight) / 2,
        ((1 + camera.Pv[4]) * game.ViewportWidth) / 2,
        ((1 - camera.Pv[5]) * game.ViewportHeight) / 2
    );

    game.ForegroundContext.resetTransform();
    game.ForegroundContext.clearRect(0, 0, game.ViewportWidth, game.ViewportHeight);
    game.ForegroundContext.transform(
        (camera.Pv[0] * game.ViewportWidth) / 2,
        (-camera.Pv[1] * game.ViewportHeight) / 2,
        (-camera.Pv[2] * game.ViewportWidth) / 2,
        (camera.Pv[3] * game.ViewportHeight) / 2,
        ((1 + camera.Pv[4]) * game.ViewportWidth) / 2,
        ((1 - camera.Pv[5]) * game.ViewportHeight) / 2
    );

    let contexts = [game.BackgroundContext, game.ForegroundContext];
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let node = game.World.SpatialNode2D[ent];
            let draw = game.World.Draw[ent];
            let ctx = contexts[draw.Context];

            ctx.save();
            ctx.transform(
                node.World[0],
                -node.World[1],
                -node.World[2],
                node.World[3],
                node.World[4],
                -node.World[5]
            );

            switch (draw.Kind) {
                case DrawKind.Rect: {
                    ctx.fillStyle = draw.Color;
                    ctx.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
                    break;
                }
                case DrawKind.Arc: {
                    ctx.fillStyle = draw.Color;
                    ctx.beginPath();
                    ctx.arc(0, 0, draw.Radius, draw.StartAngle, draw.EndAngle);
                    ctx.fill();
                    break;
                }
            }

            ctx.restore();
        }
    }
}
