import {instantiate} from "../../lib/game.js";
import {set_position} from "../components/com_local_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {instantiate_tiled_layer} from "../tiled.js";
import {World} from "../world.js";
import {blueprint_camera_main} from "./blu_camera_main.js";

export function scene_stage(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        ...blueprint_camera_main(game),
        set_position(game.World.Width / 2, game.World.Height / 2),
    ]);

    // Background.
    instantiate_tiled_layer(
        game,
        new Array(game.World.Width * game.World.Height).fill(1),
        game.World.Width
    );
}
