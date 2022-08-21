import {instantiate} from "../../lib/game.js";
import {pointer_clicked} from "../../lib/input.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {blueprint_building} from "../scenes/blu_building.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_build_buildings(game: Game, delta: number) {
    let building_placed = false;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "building") {
                continue;
            }

            if (pointer_clicked(game, 0)) {
                game.World.Signature[ent] &= ~Has.ControlPlayer;
                building_placed = true;
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }

    if (building_placed && game.ActiveBuilding) {
        // Create a new phantom buildingd entity, ready to be placed again.
        instantiate(game, blueprint_building(game, game.ActiveBuilding, 0.2));
    }
}
