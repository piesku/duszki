import {pointer_clicked, pointer_down} from "../../lib/input.js";
import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";
import {make_road} from "./sys_build_roads.js";
import {BEING_SATISFIED_MASK} from "./sys_satisfy.js";

const QUERY = Has.ControlPlayer | Has.LocalTransform2D;
const world_position: Vec2 = [0, 0];

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
                if (cell.TileEntity !== null) {
                    if (game.World.Signature[cell.TileEntity] & Has.SpatialNode2D) {
                        let spatial = game.World.SpatialNode2D[cell.TileEntity];
                        if (spatial.Parent !== undefined) {
                            // Reset the world grid for all the building's tiles.
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
                                cell.TileEntity = null;

                                let satisfy = game.World.Satisfy[child_entity];
                                if (satisfy) {
                                    let ocupados = satisfy.Ocupados;
                                    for (let i = 0; i < ocupados.length; i++) {
                                        let ocupado = ocupados[i];
                                        game.World.Signature[ocupado] |= BEING_SATISFIED_MASK;
                                    }
                                    satisfy.Ocupados = [];
                                } else {
                                    game.World.Grid[y][x].Walkable = false;
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
                    // Adjust the neighbors if necessary.
                    make_road(game, x, y);
                }
            } else if (pointer_clicked(game, 2)) {
                destroy_all(game.World, ent);
            }
        }
    }
}
