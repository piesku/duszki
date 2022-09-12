import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {Entity} from "../../lib/world.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {query_up} from "../components/com_spatial_node2d.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {total_cost} from "../generator.js";
import {BuildingAttributes, BuildingSatisfiers} from "../scenes/blu_building.js";
import {GridType, Has} from "../world.js";
import {make_tiled_road} from "./sys_build_roads.js";
import {make_tiled_park} from "./sys_build_trees.js";
import {BEING_SATISFIED_MASK} from "./sys_satisfy.js";

const world_position: Vec2 = [0, 0];

export function sys_build_erase(game: Game, delta: number) {
    if (document.body.classList.contains("erasing")) {
        let x = Math.round(game.PointerPosition[0]);
        let y = Math.round(game.PointerPosition[1]);
        let cell = game.World.Grid[y]?.[x];
        if (cell && cell.TileEntity !== null) {
            let render = game.World.Render2D[cell.TileEntity];
            render.Color[0] = 0.2;
            render.Color[1] = 0.2;
            render.Color[2] = 0.2;

            if (pointer_down(game, 0)) {
                if (game.World.Signature[cell.TileEntity] & Has.SpatialNode2D) {
                    let root_entity: Entity | undefined;
                    for (let parent_entity of query_up(
                        game.World,
                        cell.TileEntity,
                        Has.Generator
                    )) {
                        root_entity = parent_entity;
                        break;
                    }

                    if (root_entity === undefined) {
                        destroy_all(game.World, cell.TileEntity);
                    } else {
                        let generator = game.World.Generator[root_entity];
                        let reimbursed = total_cost(
                            GENERATORS[generator.Id],
                            game.GeneratorCounts[generator.Id] - 1
                        );
                        game.World.TotalWealth += reimbursed;

                        let satisfy = game.World.Satisfy[root_entity];
                        let children = game.World.Children[root_entity].Children;
                        let satisfier_entities = children[BuildingAttributes.Satisfier];
                        let jezyczek_entity =
                            game.World.Children[satisfier_entities].Children[
                                BuildingSatisfiers.Jezyczek
                            ];
                        let jezyczek_spatial = game.World.SpatialNode2D[jezyczek_entity];
                        get_translation(world_position, jezyczek_spatial.World);
                        let jezyczek_x = Math.round(world_position[0]);
                        let jezyczek_y = Math.round(world_position[1]);
                        let jezyczek_cell = game.World.Grid[jezyczek_y]?.[jezyczek_x];
                        if (jezyczek_cell) {
                            for (let ocupado of satisfy.Ocupados) {
                                game.World.Signature[ocupado] |= BEING_SATISFIED_MASK;
                                let walk = game.World.Walk[ocupado];
                                // Don't use DestinationTrigger because it triggers
                                // proper path finding, which requires that the
                                // current cell be walkable (which it won't be when
                                // we finish here).
                                walk.Path = [jezyczek_cell];
                            }
                        }

                        for (let child_entity of query_down(
                            game.World,
                            root_entity,
                            Has.Render2D
                        )) {
                            let child_spatial = game.World.SpatialNode2D[child_entity];
                            get_translation(world_position, child_spatial.World);
                            let x = Math.round(world_position[0]);
                            let y = Math.round(world_position[1]);
                            let cell = game.World.Grid[y][x];

                            // Reset the world grid for the building's tiles.
                            cell.Walkable = false;
                            cell.TileEntity = null;
                        }

                        // Destroy the building's root entity.
                        destroy_all(game.World, root_entity);
                    }
                } else {
                    // It's a road or a tree.
                    destroy_all(game.World, cell.TileEntity);
                }

                cell.TileEntity = null;
                cell.Walkable = false;
                cell.Pleasant = false;
                cell.Ocupados = [];
                cell.Type = GridType.Other;
                // Adjust the neighbors if necessary.
                make_tiled_road(game, x, y);
                make_tiled_park(game, x, y);
            }
        } else if (pointer_clicked(game, 2)) {
            document.body.classList.remove("erasing");
        }
    }
}
