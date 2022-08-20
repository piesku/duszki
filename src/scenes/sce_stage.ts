import {instantiate} from "../../lib/game.js";
import {map_domek01} from "../../maps/map_domek01.js";
import {map_domek02} from "../../maps/map_domek02.js";
import {disable} from "../components/com_disable.js";
import {set_position} from "../components/com_local_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {Has, World} from "../world.js";
import {blueprint_building} from "./blu_building.js";
import {blueprint_camera} from "./blu_camera.js";

export function scene_stage(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [...blueprint_camera(game), set_position(0, 0)]);

    // Domek01.
    instantiate(game, [
        ...blueprint_building(game, map_domek01, 0.1),
        set_position(0, 0),
        disable(Has.ControlPlayer),
    ]);

    // Domek01.
    instantiate(game, [...blueprint_building(game, map_domek02, 0.2), set_position(0, 0)]);
}
