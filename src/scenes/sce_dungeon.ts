import {instantiate} from "../../lib/game.js";
import {map_sample} from "../../maps/map_sample.js";
import {set_position} from "../components/com_local_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {instantiate_tiled_layer} from "../tiled.js";
import {World} from "../world.js";
import {blueprint_camera} from "./blu_camera.js";

export function scene_dungeon(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [...blueprint_camera(game), set_position(16, 10)]);

    // Map layers.
    instantiate_tiled_layer(game, map_sample.layers[0]);
    instantiate_tiled_layer(game, map_sample.layers[1]);
    instantiate_tiled_layer(game, map_sample.layers[2]);
}
