import {instantiate} from "../../lib/game.js";
import {pointer_clicked} from "../../lib/input.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {set_position} from "../components/com_local_transform2d.js";
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

            // Check whether the building can be placed.
            let can_be_placed = true;
            for (let child_entity of query_down(game.World, ent, Has.Render2D)) {
                let spatial = game.World.SpatialNode2D[child_entity];
                let x = Math.round(spatial.World[4]);
                let y = Math.round(spatial.World[5]);
                let cell = game.World.Grid[y][x];
                if (cell.tile_entity !== null) {
                    can_be_placed = false;
                    break;
                }
            }

            // Tint the building according to whether it can be placed.
            for (let child_entity of query_down(game.World, ent, Has.Render2D)) {
                let render = game.World.Render2D[child_entity];
                render.Color[0] = can_be_placed ? 0 : 1;
                render.Color[1] = can_be_placed ? 1 : 0;
                render.Color[2] = 0;
            }

            let generator = game.World.Generator[ent];
            let gen_config = GENERATORS[generator.Id];
            let gen_count = game.GeneratorCounts[generator.Id];
            let cost = total_cost(gen_config, gen_count, 1);

            if (can_be_placed && cost <= game.TotalWealth && pointer_clicked(game, 0)) {
                game.TotalWealth -= cost;
                game.World.Signature[ent] &= ~Has.ControlPlayer;
                game.World.Signature[ent] |= Has.Generator;
                building_placed = true;

                // Populate the world grid with the building's footprint and
                // bring back the original tint.
                for (let child_entity of query_down(game.World, ent, Has.Render2D)) {
                    let spatial = game.World.SpatialNode2D[child_entity];
                    let x = Math.round(spatial.World[4]);
                    let y = Math.round(spatial.World[5]);
                    game.World.Grid[y][x].tile_entity = child_entity;

                    let render = game.World.Render2D[child_entity];
                    render.Color[0] = 1;
                    render.Color[1] = 1;
                    render.Color[2] = 1;
                }
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }

    if (building_placed && game.ActiveBuilding !== null) {
        // Create a new phantom buildingd entity, ready to be placed again.
        instantiate(game, [
            ...blueprint_building(game, game.ActiveBuilding, 0.2),
            set_position(Math.round(game.PointerPosition[0]), Math.round(game.PointerPosition[1])),
        ]);
    }
}
