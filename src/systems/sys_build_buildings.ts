import {instantiate} from "../../lib/game.js";
import {pointer_clicked} from "../../lib/input.js";
import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {set_position} from "../components/com_local_transform2d.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {total_cost} from "../generator.js";
import {
    blueprint_building,
    BuildingAttributes,
    BuildingSatisfiers,
} from "../scenes/blu_building.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;
const world_position: Vec2 = [0, 0];

const DUSZEK_SPAWNING_BUILDING_INDEX = 0;

export function sys_build_buildings(game: Game, delta: number) {
    let building_placed = false;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "building") {
                continue;
            }

            let children = game.World.Children[ent].Children;
            let tiles_container = children[BuildingAttributes.Tiles];

            // Check whether the building can be placed and tint its tiles accordingly.
            let can_be_placed = true;
            for (let child_entity of query_down(game.World, tiles_container, Has.Render2D)) {
                let render = game.World.Render2D[child_entity];
                let local = game.World.LocalTransform2D[child_entity];
                let spatial = game.World.SpatialNode2D[child_entity];
                let x = Math.round(spatial.World[4]);
                let y = Math.round(spatial.World[5]);
                let cell = game.World.Grid[y]?.[x];
                if (local.Translation[1] > 3 || (cell && cell.TileEntity === null)) {
                    render.Color[0] = 0;
                    render.Color[1] = 1;
                    render.Color[2] = 0;
                } else {
                    can_be_placed = false;
                    render.Color[0] = 1;
                    render.Color[1] = 0;
                    render.Color[2] = 0;
                }
            }

            let generator = game.World.Generator[ent];
            let gen_config = GENERATORS[generator.Id];
            let gen_count = game.GeneratorCounts[generator.Id];
            let cost = total_cost(gen_config, gen_count, 1);

            if (can_be_placed && cost <= game.World.TotalWealth && pointer_clicked(game, 0)) {
                game.World.TotalWealth -= cost;
                game.World.Signature[ent] &= ~Has.ControlPlayer;
                game.World.Signature[ent] |= Has.Generator;
                building_placed = true;

                // Populate the world grid with the building's footprint and
                // bring back the original tint.
                for (let child_entity of query_down(game.World, tiles_container, Has.Render2D)) {
                    let local = game.World.LocalTransform2D[child_entity];
                    let spatial = game.World.SpatialNode2D[child_entity];
                    get_translation(world_position, spatial.World);
                    let x = Math.round(world_position[0]);
                    let y = Math.round(world_position[1]);

                    if (local.Translation[1] > 3) {
                        // It's a peak roof tile; don't place it on the grid.
                    } else {
                        let cell = game.World.Grid[y]?.[x];
                        cell.TileEntity = child_entity;
                        cell.Walkable = false;
                        cell.Pleasant = false;
                    }

                    let render = game.World.Render2D[child_entity];
                    render.Color[0] = 1;
                    render.Color[1] = 1;
                    render.Color[2] = 1;
                    render.Shift = 0;
                }

                // set door to walkable
                let buildingSatisfierEntities = children[BuildingAttributes.Satisfier];
                let door =
                    game.World.Children[buildingSatisfierEntities]?.Children[
                        BuildingSatisfiers.Door
                    ];

                let door_spatial = game.World.SpatialNode2D[door];
                let door_local = get_translation([0, 0], door_spatial.World);
                let door_x = Math.round(door_local[0]);
                let door_y = Math.round(door_local[1]);
                let door_cell = game.World.Grid[door_y]?.[door_x];
                door_cell.Walkable = true;
            } else if (pointer_clicked(game, 2)) {
                document.body.classList.remove("building");
                destroy_all(game.World, ent);
            }
        }
    }

    if (building_placed && game.ActiveBuilding !== null) {
        // Create a new phantom buildingd entity, ready to be placed again.
        instantiate(game, [
            ...blueprint_building(game, game.ActiveBuilding),
            set_position(Math.round(game.PointerPosition[0]), Math.round(game.PointerPosition[1])),
        ]);
    }
}
