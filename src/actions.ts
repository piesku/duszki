import {instantiate} from "../lib/game.js";
import {Vec2} from "../lib/math.js";
import {Entity, first_having} from "../lib/world.js";
import {Tile} from "../sprites/spritesheet.js";
import {destroy_all} from "./components/com_children.js";
import {copy_position, set_position} from "./components/com_local_transform2d.js";
import {set_sprite} from "./components/com_render2d.js";
import {Game} from "./game.js";
import {blueprint_building} from "./scenes/blu_building.js";
import {blueprint_duszek} from "./scenes/blu_duszek.js";
import {blueprint_road_phantom} from "./scenes/blu_road.js";
import {blueprint_tree_phantom} from "./scenes/blu_tree.js";
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
            document.body.classList.remove("erasing");
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            document.body.classList.add("building");
            instantiate(game, [
                ...blueprint_road_phantom(game),
                copy_position(game.PointerPosition),
            ]);
            break;
        }
        case Action.EnterPlaceTree: {
            document.body.classList.remove("erasing");
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            document.body.classList.add("building");
            instantiate(game, [
                ...blueprint_tree_phantom(game),
                copy_position(game.PointerPosition),
            ]);
            break;
        }
        case Action.EnterPlaceBuilding: {
            document.body.classList.remove("erasing");
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            document.body.classList.add("building");
            let building_id = payload as number;
            instantiate(game, [
                ...blueprint_building(game, building_id),
                copy_position(game.PointerPosition),
            ]);
            game.ActiveBuilding = building_id;
            break;
        }
        case Action.EnterErase: {
            document.body.classList.remove("building");
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            document.body.classList.add("erasing");
            break;
        }
        case Action.SpawnDuszek: {
            game.World.DuszkiAlive++;
            game.FrameStats.Spawns++;
            instantiate(game, [
                ...blueprint_duszek(game),
                set_position(0, Math.round(game.World.Height / 2)),
            ]);
            break;
        }
        case Action.DuszekDied: {
            let [entity] = payload as [Entity, Vec2];
            game.World.DuszkiAlive--;
            game.FrameStats.Deaths++;
            game.World.Signature[entity] &= ~(Has.ControlAi | Has.Move2D | Has.Alive);
            game.World.Walk[entity].DestinationTrigger = null;
            game.World.Walk[entity].Path = [];
            set_sprite(game, entity, Tile.Sign);
            game.World.Render2D[entity].Shift = 0.9;
            game.World.Signature[entity] |= Has.Lifespan;
            break;
        }
        case Action.ResetGame: {
            if (confirm("Are you sure you want to start a new game? All progress will be lost.")) {
                clear(game.Store);
                location.reload();
            }
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
