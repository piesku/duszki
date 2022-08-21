import {pointer_clicked} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_build_buildings(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "building") {
                continue;
            }

            if (pointer_clicked(game, 0)) {
                game.World.Signature[ent] &= ~Has.ControlPlayer;
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }
}
