import {instantiate} from "../../lib/game.js";
import {pointer_clicked} from "../../lib/input.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {total_cost} from "../generator.js";
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

            let generator = game.World.Generator[ent];
            let gen_config = GENERATORS[generator.Id];
            let gen_count = game.GeneratorCounts[generator.Id];
            let cost = total_cost(gen_config, gen_count, 1);

            if (cost <= game.TotalWealth && pointer_clicked(game, 0)) {
                game.TotalWealth -= cost;
                game.World.Signature[ent] &= ~Has.ControlPlayer;
                game.World.Signature[ent] |= Has.Generator;
                building_placed = true;

                for (let child_entity of query_down(game.World, ent, Has.Render2D)) {
                    // Populate the world's grid with the building's footprint.
                    let spatial = game.World.SpatialNode2D[child_entity];
                    let x = Math.round(spatial.World[4]);
                    let y = Math.round(spatial.World[5]);
                    game.World.Grid[y][x].tile_entity = child_entity;
                }
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }

    if (building_placed && game.ActiveBuilding !== null) {
        // Create a new phantom buildingd entity, ready to be placed again.
        instantiate(game, blueprint_building(game, game.ActiveBuilding, 0.2));
    }
}
