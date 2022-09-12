import {instantiate} from "../../lib/game.js";
import {float, integer} from "../../lib/random.js";
import {grid, GridFlag} from "../components/com_grid.js";
import {set_position} from "../components/com_local_transform2d.js";
import {shift} from "../components/com_render2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {make_tiled_road} from "../systems/sys_build_roads.js";
import {make_tiled_park} from "../systems/sys_build_trees.js";
import {GridType, World} from "../world.js";
import {blueprint_camera_follow} from "./blu_camera_follow.js";
import {blueprint_camera_main} from "./blu_camera_main.js";
import {blueprint_empty, blueprint_grass} from "./blu_grass.js";
import {blueprint_road} from "./blu_road.js";
import {blueprint_tree} from "./blu_tree.js";

export function scene_editable_dungeon(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Main camera.
    instantiate(game, [
        ...blueprint_camera_main(game),
        set_position(game.World.Width / 2 - 0.5, game.World.Height / 2 - 0.5),
    ]);

    // Follow camera.
    instantiate(game, [
        ...blueprint_camera_follow(game),
        set_position(game.World.Width / 2, game.World.Height / 2),
    ]);

    // Highway to Hell
    let mid_x = Math.round(game.World.Width / 2);
    let mid_y = Math.round(game.World.Height / 2);
    for (let x = 0; x < game.World.Width; x++) {
        instantiate(game, [...blueprint_empty(game), set_position(x, mid_y), shift(-1)]);
        instantiate(game, [
            ...blueprint_road(game),
            set_position(x, mid_y),
            grid(GridFlag.Walkable, GridType.Road),
        ]);
        make_tiled_road(game, x, mid_y);
    }

    // Grass tiles in the background.
    for (let y = 0; y < game.World.Height; y++) {
        for (let x = 0; x < game.World.Width; x++) {
            let cell = game.World.Grid[y][x];
            if (cell.TileEntity === null) {
                if (float() < 0.1) {
                    instantiate(game, [...blueprint_grass(game), set_position(x, y), shift(-1)]);
                } else {
                    instantiate(game, [...blueprint_empty(game), set_position(x, y), shift(-1)]);
                }
            }
        }
    }

    // Trees.
    let tree_count = (game.World.Width * game.World.Height) / 2;
    for (let i = 0; i < tree_count; i++) {
        let x = integer(1, game.World.Width - 2);
        let y = integer(1, game.World.Height - 2);
        let cell = game.World.Grid[y][x];
        if (
            y !== mid_y &&
            (x < mid_x - 10 || x > mid_x + 10 || y < mid_y - 10 || y > mid_y + 10) &&
            !cell.Pleasant
        ) {
            instantiate(game, [
                ...blueprint_tree(game),
                set_position(x, y),
                grid(GridFlag.Pleasant, GridType.Tree),
            ]);
            make_tiled_park(game, x, y);
        }
    }
}
