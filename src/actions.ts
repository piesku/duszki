import {instantiate} from "../lib/game.js";
import {first_having} from "../lib/world.js";
import {map_domek01} from "../maps/map_domek01.js";
import {map_domek02} from "../maps/map_domek02.js";
import {destroy_all} from "./components/com_children.js";
import {set_position} from "./components/com_local_transform2d.js";
import {Game} from "./game.js";
import {blueprint_building} from "./scenes/blu_building.js";
import {blueprint_duszek} from "./scenes/blu_duszek.js";
import {blueprint_road} from "./scenes/blu_road.js";
import {Has} from "./world.js";

export const enum Action {
    EnterPlaceRoad,
    EnterPlaceBuilding,
    SpawnDuszek,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.EnterPlaceRoad: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            instantiate(game, blueprint_road(game));
            break;
        }
        case Action.EnterPlaceBuilding: {
            let previous_phantom = first_having(game.World, Has.ControlPlayer);
            if (previous_phantom !== undefined) {
                destroy_all(game.World, previous_phantom);
            }

            let building_id = payload as number;
            let building_map = [map_domek01, map_domek02][building_id];
            instantiate(game, blueprint_building(game, building_map, 0.2));
            game.ActiveBuilding = building_map;
            break;
        }
        case Action.SpawnDuszek: {
            let center_x = Math.round(game.World.Width / 2);
            let center_y = Math.round(game.World.Height / 2);
            instantiate(game, [...blueprint_duszek(game), set_position(center_x, center_y)]);
            break;
        }
    }
}
