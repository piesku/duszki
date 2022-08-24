import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {make_road} from "./sys_build_roads.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;

export function sys_build_erase(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let control = game.World.ControlPlayer[ent];
            if (control.Kind !== "eraser") {
                continue;
            }

            if (pointer_down(game, 0)) {
                let x = Math.round(game.PointerPosition[0]);
                let y = Math.round(game.PointerPosition[1]);

                let cell = game.World.Grid[y][x];
                if (cell.tile_entity !== null) {
                    if (game.World.Signature[cell.tile_entity] & Has.SpatialNode2D) {
                        let spatial = game.World.SpatialNode2D[cell.tile_entity];
                        if (spatial.Parent !== undefined) {
                            // Reset the world grid for all the building's tiles.
                            for (let child_entity of query_down(
                                game.World,
                                spatial.Parent,
                                Has.Render2D
                            )) {
                                let child_spatial = game.World.SpatialNode2D[child_entity];
                                let child_x = Math.round(child_spatial.World[4]);
                                let child_y = Math.round(child_spatial.World[5]);
                                game.World.Grid[child_y][child_x].tile_entity = null;
                                game.World.Grid[child_y][child_x].walkable = false;
                            }
                            // Destroy the building's root entity.
                            destroy_all(game.World, spatial.Parent);
                        } else {
                            destroy_all(game.World, cell.tile_entity);
                        }
                    } else {
                        // It's a road.
                        destroy_all(game.World, cell.tile_entity);
                    }

                    cell.tile_entity = null;
                    cell.walkable = false;
                    cell.ocupados = [];
                    // Adjust the neighbors if necessary.
                    make_road(game, x, y);
                }
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }
}
