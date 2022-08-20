import {instantiate} from "../../lib/game.js";
import {set_position} from "../components/com_local_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {instantiate_tiled_layer} from "../tiled.js";
import {World} from "../world.js";
import {blueprint_camera} from "./blu_camera.js";

export function scene_stage(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game),
        set_position(game.World.Width / 2, game.World.Height / 2),
    ]);

    // Background.
    instantiate_tiled_layer(
        game,
        new Array(game.World.Width * game.World.Height).fill(1),
        game.World.Width,
        0.1
    );
}
