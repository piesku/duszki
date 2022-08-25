import {instantiate} from "../../lib/game.js";
import {element, integer} from "../../lib/random.js";
import {grid} from "../components/com_grid.js";
import {local_transform2d, set_position} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {make_road} from "../systems/sys_build_roads.js";
import {World} from "../world.js";
import {blueprint_camera} from "./blu_camera.js";
import {blueprint_duszek} from "./blu_duszek.js";

export function scene_editable_dungeon(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game),
        set_position(game.World.Width / 2 - 0.5, game.World.Height / 2 - 0.5),
    ]);

    // Grass tiles in the background.
    let grass_tiles = ["000.png", "017.png", "019.png", "034.png", "051.png"];
    let grass_count = (game.World.Width * game.World.Height) / 10;
    for (let i = 0; i < grass_count; i++) {
        let x = integer(0, game.World.Width - 1);
        let y = integer(0, game.World.Height - 1);
        instantiate(game, [local_transform2d([x, y]), render2d(element(grass_tiles)), shift(-1)]);
    }

    // 1 Hell Plaza
    let center_x = Math.round(game.World.Width / 2);
    let center_y = Math.round(game.World.Height / 2);
    let plaza_width = 8;
    let plaza_height = 4;
    for (let x = Math.round(center_x - plaza_width / 2); x < center_x + plaza_width / 2; x++) {
        for (
            let y = Math.round(center_y - plaza_height / 2);
            y < center_y + plaza_height / 2;
            y++
        ) {
            instantiate(game, [local_transform2d([x, y]), render2d("000.png"), grid(true)]);
            make_road(game, x, y);
        }
    }

    instantiate(game, [...blueprint_duszek(game), set_position(center_x, center_y)]);
}
