import {instantiate} from "../../lib/game.js";
import {get_translation} from "../../lib/mat2d.js";
import {Vec2} from "../../lib/math.js";
import {integer} from "../../lib/random.js";
import {destroy_all, query_down} from "../components/com_children.js";
import {set_position} from "../components/com_local_transform2d.js";
import {NeedType} from "../components/com_needs.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {BuildingAttributes, BuildingSatisfiers} from "../scenes/blu_building.js";
import {blueprint_grave} from "../scenes/blu_grave.js";
import {Has} from "../world.js";

const QUERY = Has.Satisfy;

export function sys_satisfy(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }
}

export const BEING_SATISFIED_MASK = Has.Render2D | Has.Walk | Has.Alive;
// Duszkis are getting tired and hungry while working.
export const WORKING_MASK = Has.Render2D | Has.Walk;
export const SATISFY_THRESHOLD = 0.75;
export const LOW_SATISFY_THRESHOLD = 0.4;

const world_position: Vec2 = [0, 0];

function update(game: Game, entity: number, delta: number) {
    let satisfy = game.World.Satisfy[entity];

    let children = game.World.Children[entity].Children;
    let buildingSatisfierEntities = children[BuildingAttributes.Satisfier];
    let jezyczek =
        game.World.Children[buildingSatisfierEntities]?.Children[BuildingSatisfiers.Jezyczek];
    let door = game.World.Children[buildingSatisfierEntities]?.Children[BuildingSatisfiers.Door];

    // JEZYCZEK LOGIC
    let jezyczek_spatial = game.World.SpatialNode2D[jezyczek];
    get_translation(world_position, jezyczek_spatial.World);
    let jezyczek_x = Math.round(world_position[0]);
    let jezyczek_y = Math.round(world_position[1]);
    let jezyczek_cell = game.World.Grid[jezyczek_y]?.[jezyczek_x];
    if (!jezyczek_cell) {
        return;
    }

    let guests_on_jezyczek = jezyczek_cell.Ocupados;
    for (let guest of guests_on_jezyczek) {
        let need = game.World.Needs[guest];
        need.Target[satisfy.NeedType] = entity;
    }

    // DOOR LOGIC
    let door_spatial = game.World.SpatialNode2D[door];
    get_translation(world_position, door_spatial.World);
    let door_x = Math.round(world_position[0]);
    let door_y = Math.round(world_position[1]);
    let door_cell = game.World.Grid[door_y]?.[door_x];
    if (!door_cell) {
        return;
    }

    let guests_on_door = door_cell.Ocupados;
    for (let guest of guests_on_door) {
        let need = game.World.Needs[guest];
        let walk = game.World.Walk[guest];
        if (need && satisfy.NeedType === NeedType.WORK) {
            // Duszek works only when fed and rested.
            if (
                need.Value[NeedType.FOOD] > SATISFY_THRESHOLD &&
                need.Value[NeedType.SLEEP] > SATISFY_THRESHOLD
            ) {
                if (satisfy.Ocupados.length <= satisfy.Capacity) {
                    satisfy.Ocupados.push(guest);
                    game.World.Signature[guest] &= ~WORKING_MASK;
                    game.World.DuszkiWorking++;
                    need.Target[satisfy.NeedType] = entity;
                    walk.Path = [];
                    walk.DestinationTrigger = null;
                    // } else if (guests_at_the_door.length > 1) {
                } else if (entity === need.Target[satisfy.NeedType]) {
                    // more than one duszek at the door, so redirect all but one to another target
                    need.Target[satisfy.NeedType] = undefined;
                }
            }
        } else if (need && need.Value[satisfy.NeedType] < SATISFY_THRESHOLD) {
            if (satisfy.Ocupados.length < satisfy.Capacity) {
                satisfy.Ocupados.push(guest);
                game.World.Signature[guest] &= ~BEING_SATISFIED_MASK;
                need.Target[satisfy.NeedType] = entity;
                walk.Path = [];
                walk.DestinationTrigger = null;

                if (satisfy.NeedType === NeedType.SLEEP) {
                    let tile_entities =
                        game.World.Children[entity].Children[BuildingAttributes.Tiles];
                    let tiles = game.World.Children[tile_entities].Children;

                    let x = integer(-2, 1);
                    let y = integer(1, 2);
                    let grave = instantiate(game, [
                        spatial_node2d(),
                        ...blueprint_grave(game, x + y),
                        set_position(x, y),
                    ]);

                    tiles.push(grave);

                    game.World.Signature[tile_entities] |= Has.Dirty;
                }
            } else if (entity === need.Target[satisfy.NeedType]) {
                // more than one duszek at the door, so redirect all but one to another target
                need.Target[satisfy.NeedType] = undefined;
            }
        }
    }

    for (let guest of satisfy.Ocupados) {
        let need = game.World.Needs[guest];
        // Duszek stops working when hungry or tired.
        if (satisfy.NeedType === NeedType.WORK) {
            if (
                need.Value[NeedType.FOOD] < LOW_SATISFY_THRESHOLD ||
                need.Value[NeedType.SLEEP] < LOW_SATISFY_THRESHOLD
            ) {
                satisfy.Ocupados.splice(satisfy.Ocupados.indexOf(guest), 1);
                game.World.Signature[guest] |= WORKING_MASK;
                game.World.DuszkiWorking--;
            }
        } else {
            need.Value[satisfy.NeedType] += need.Delta[satisfy.NeedType] * delta * 4;

            if (need.Value[satisfy.NeedType] >= 1) {
                satisfy.Ocupados.splice(satisfy.Ocupados.indexOf(guest), 1);
                game.World.Signature[guest] |= BEING_SATISFIED_MASK;

                if (satisfy.NeedType === NeedType.SLEEP) {
                    let tile_entities =
                        game.World.Children[entity].Children[BuildingAttributes.Tiles];
                    let tiles = game.World.Children[tile_entities].Children;

                    let grave = tiles[9];
                    tiles.splice(9, 1);
                    destroy_all(game.World, grave);
                }
            }
        }
    }

    let lights_container = children[BuildingAttributes.Lights];
    for (let child_entity of query_down(game.World, lights_container, Has.Render2D)) {
        let render = game.World.Render2D[child_entity];
        if (satisfy.Ocupados.length > 0) {
            render.Color[0] = 1;
            render.Color[1] = 1;
            render.Color[2] = 0;
        } else {
            render.Color[0] = 0.3;
            render.Color[1] = 0.3;
            render.Color[2] = 0.3;
        }
    }
}
