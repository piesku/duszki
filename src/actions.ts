import {instantiate} from "../lib/game.js";
import {Vec2} from "../lib/math.js";
import {first_having} from "../lib/world.js";
import {destroy_all} from "./components/com_children.js";
import {copy_position, set_position} from "./components/com_local_transform2d.js";
import {Game} from "./game.js";
import {blueprint_building} from "./scenes/blu_building.js";
import {blueprint_duszek} from "./scenes/blu_duszek.js";
import {blueprint_eraser} from "./scenes/blu_eraser.js";
import {blueprint_grave} from "./scenes/blu_grave.js";
import {blueprint_road} from "./scenes/blu_road.js";
import {scene_editable_dungeon} from "./scenes/sce_editable_dungeon.js";
import {clear} from "./store.js";
import {Has} from "./world.js";

export const enum Action {
    EnterPlaceRoad,
    EnterPlaceBuilding,
    EnterErase,
    SpawnDuszek,
    DuszekDied,
    ResetGame,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.EnterPlaceRoad: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            instantiate(game, [...blueprint_road(game), copy_position(game.PointerPosition)]);
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
            let center_x = Math.round(game.World.Width / 2);
            let center_y = Math.round(game.World.Height / 2);
            instantiate(game, [...blueprint_duszek(game), set_position(center_x, center_y)]);
            break;
        }
        case Action.DuszekDied: {
            let position = payload as Vec2;
            game.World.DuszkiAlive--;
            instantiate(game, [
                ...blueprint_grave(game),
                set_position(Math.round(position[0]), Math.round(position[1])),
            ]);
            break;
        }
        case Action.ResetGame: {
            clear(game.Store);
            scene_editable_dungeon(game);
            break;
        }
    }
}
