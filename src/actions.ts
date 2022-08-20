import {instantiate} from "../lib/game.js";
import {map_domek01} from "../maps/map_domek01.js";
import {map_domek02} from "../maps/map_domek02.js";
import {set_position} from "./components/com_local_transform2d.js";
import {Game} from "./game.js";
import {blueprint_building} from "./scenes/blu_building.js";

export const enum Action {
    EnterBuild,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.EnterBuild: {
            let building_id = payload as number;
            let building_map = [map_domek01, map_domek02][building_id];
            instantiate(game, [...blueprint_building(game, building_map, 0.2), set_position(0, 0)]);
            break;
        }
    }
}
