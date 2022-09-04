import {instantiate} from "../../lib/game.js";
import {element, integer} from "../../lib/random.js";
import {DrawContext, draw_rect} from "../components/com_draw.js";
import {grid, GridFlag} from "../components/com_grid.js";
import {local_transform2d, set_position} from "../components/com_local_transform2d.js";
import {render2d, shift} from "../components/com_render2d.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {make_road} from "../systems/sys_build_roads.js";
import {World} from "../world.js";
import {blueprint_camera_follow} from "./blu_camera_follow.js";
import {blueprint_camera_main} from "./blu_camera_main.js";
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

    instantiate(game, [
        spatial_node2d(),
        local_transform2d([game.World.Width / 2 - 0.5, game.World.Height / 2 - 0.5], 0, [
            game.World.Width,
            game.World.Height,
        ]),
        draw_rect(DrawContext.Background, "rgb(181, 176, 222)"),
    ]);

    // Grass tiles in the background.
    let grass_tiles = ["000.png", "017.png", "019.png", "034.png", "051.png"];
    let grass_count = (game.World.Width * game.World.Height) / 10;
    for (let i = 0; i < grass_count; i++) {
        let x = integer(1, game.World.Width - 2);
        let y = integer(1, game.World.Height - 2);
        instantiate(game, [local_transform2d([x, y]), render2d(element(grass_tiles)), shift(-1)]);
    }

    // Highway to Hell
    let highway_y = Math.round(game.World.Height / 2);
    for (let x = 0; x < game.World.Width; x++) {
        instantiate(game, [
            ...blueprint_road(game),
            set_position(x, highway_y),
            grid(GridFlag.Walkable),
        ]);
        make_road(game, x, highway_y);
    }

    let tree_count = (game.World.Width * game.World.Height) / 100;
    for (let i = 0; i < tree_count; i++) {
        let x = integer(1, game.World.Width - 2);
        let y = integer(1, game.World.Height - 2);
        if (y !== highway_y) {
            instantiate(game, [
                ...blueprint_tree(game),
                set_position(x, y),
                grid(GridFlag.Pleasant),
            ]);
        }
    }
}
