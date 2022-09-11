import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {Game} from "../game.js";
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
                    let spatial = game.World.SpatialNode2D[cell.TileEntity];
                    if (spatial.Parent !== undefined) {
                        for (let child_entity of query_down(
                            game.World,
                            spatial.Parent,
                            Has.SpatialNode2D
                        )) {
                            let child_spatial = game.World.SpatialNode2D[child_entity];
                            get_translation(world_position, child_spatial.World);
                            let x = Math.round(world_position[0]);
                            let y = Math.round(world_position[1]);
                            let cell = game.World.Grid[y][x];

                            if (game.World.Signature[child_entity] & Has.Satisfy) {
                                // Release all the duszki from the building.
                                let satisfy = game.World.Satisfy[child_entity];
                                let ocupados = satisfy.Ocupados;
                                for (let i = 0; i < ocupados.length; i++) {
                                    let ocupado = ocupados[i];
                                    game.World.Signature[ocupado] |= BEING_SATISFIED_MASK;
                                }
                            } else {
                                // Reset the world grid for the building's tiles.
                                cell.Walkable = false;
                                cell.TileEntity = null;
                            }
                        }
                        // Destroy the building's root entity.
                        destroy_all(game.World, spatial.Parent);
                    } else {
                        destroy_all(game.World, cell.TileEntity);
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
