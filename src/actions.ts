import {instantiate} from "../lib/game.js";
import {Vec2} from "../lib/math.js";
import {Entity, first_having} from "../lib/world.js";
import {destroy_all} from "./components/com_children.js";
import {copy_position, set_position} from "./components/com_local_transform2d.js";
import {Game} from "./game.js";
import {blueprint_building} from "./scenes/blu_building.js";
import {blueprint_duszek} from "./scenes/blu_duszek.js";
import {blueprint_eraser} from "./scenes/blu_eraser.js";
import {blueprint_grave} from "./scenes/blu_grave.js";
import {blueprint_road_phantom} from "./scenes/blu_road.js";
import {blueprint_tree_phantom} from "./scenes/blu_tree.js";
import {scene_editable_dungeon} from "./scenes/sce_editable_dungeon.js";
import {clear} from "./store.js";
import {Has} from "./world.js";

export const enum Action {
    EnterPlaceRoad,
    EnterPlaceTree,
    EnterPlaceBuilding,
    EnterErase,
    SpawnDuszek,
    DuszekDied,
    ResetGame,
    MinimapNavigation,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.EnterPlaceRoad: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            instantiate(game, [
                ...blueprint_road_phantom(game),
                copy_position(game.PointerPosition),
            ]);
            break;
        }
        case Action.EnterPlaceTree: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            instantiate(game, [
                ...blueprint_tree_phantom(game),
                copy_position(game.PointerPosition),
            ]);
            break;
        }
        case Action.EnterPlaceBuilding: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            let building_id = payload as number;
            instantiate(game, [
                ...blueprint_building(game, building_id),
                copy_position(game.PointerPosition),
            ]);
            game.ActiveBuilding = building_id;
            break;
        }
        case Action.EnterErase: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            instantiate(game, [...blueprint_eraser(game), copy_position(game.PointerPosition)]);
            break;
        }
        case Action.SpawnDuszek: {
            game.World.DuszkiAlive++;
            instantiate(game, [
                ...blueprint_duszek(game),
                set_position(0, Math.round(game.World.Height / 2)),
            ]);
            break;
        }
        case Action.DuszekDied: {
            let [entity, position] = payload as [Entity, Vec2];
            game.World.DuszkiAlive--;
            let tombstone = instantiate(game, [
                ...blueprint_grave(game),
                set_position(Math.round(position[0]), Math.round(position[1])),
            ]);
            if (entity === game.SelectedEntity) {
                game.SelectedEntity = tombstone;
            }
            break;
        }
        case Action.ResetGame: {
            clear(game.Store);
            scene_editable_dungeon(game);
            break;
        }
        case Action.MinimapNavigation: {
            let event = payload as MouseEvent;
            let rect = game.MinimapCanvas.getBoundingClientRect();
            let scale = game.World.Width / rect.width;
            if (
                event.clientX > rect.left &&
                event.clientX < rect.right &&
                event.clientY > rect.top &&
                event.clientY < rect.bottom
            ) {
                let x = Math.floor(event.clientX - rect.left) * scale;
                let y = Math.floor(event.clientY - rect.top) * scale;

                let camera_entity = game.Cameras[0];
                if (camera_entity !== undefined) {
                    let camera_local = game.World.LocalTransform2D[camera_entity];
                    camera_local.Translation[0] = x;
                    camera_local.Translation[1] = game.World.Height - y;
                    game.World.Signature[camera_entity] |= Has.Dirty;
                }
            }
            break;
        }
    }
}
