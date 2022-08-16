import {collide2d} from "../components/com_collide2d.js";
import {lifespan} from "../components/com_lifespan.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {order, render2d} from "../components/com_render2d.js";
import {RigidKind, rigid_body2d} from "../components/com_rigid_body2d.js";
import {Game, Layer} from "../game.js";

export const SQUARE_LIFESPAN = 10;

export function blueprint_square(game: Game) {
    return [
        local_transform2d(),
        collide2d(true, Layer.Object, Layer.Terrain | Layer.Object),
        rigid_body2d(RigidKind.Dynamic, 0.3),
        render2d("121.png"),
        order(0.9),
        lifespan(SQUARE_LIFESPAN),
    ];
}
