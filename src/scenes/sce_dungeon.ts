import {instantiate} from "../../lib/game.js";
import {map_sample} from "../../maps/map_sample.js";
import {callback} from "../components/com_callback.js";
import {local_transform2d, set_position} from "../components/com_local_transform2d.js";
import {move2d} from "../components/com_move2d.js";
import {order, render2d} from "../components/com_render2d.js";
import {walk} from "../components/com_walk.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {instantiate_tiled_layer} from "../tiled.js";
import {node_to_position, World} from "../world.js";
import {blueprint_camera} from "./blu_camera.js";
import {blueprint_cursor} from "./blu_cursor.js";

export function scene_dungeon(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game),
        set_position(game.World.Width / 2 - 0.5, game.World.Height / 2 - 0.5),
    ]);

    // Cursor.
    instantiate(game, [
        ...blueprint_cursor(game),
        set_position(game.World.Width / 2, game.World.Height / 2),
    ]);

    // Terrain.
    instantiate_tiled_layer(game, map_sample.layers[0], 0.1);

    // Objects.
    instantiate_tiled_layer(game, map_sample.layers[1], 0.6);
    instantiate_tiled_layer(game, map_sample.layers[2], 0.7);

    let nav = map_sample.layers[3];
    for (let i = 0; i < nav.data.length; i++) {
        let tile = nav.data[i];
        if (tile == 0) {
            // Impassable.
            continue;
        }

        // Createa a new navigation node.
        game.World.Navigation.Centroids[i] = [0, 0];
        game.World.Navigation.Graph[i] = [];

        let position = game.World.Navigation.Centroids[i];
        node_to_position(position, game.World, i);

        let edges = game.World.Navigation.Graph[i];
        if (i > 0 && nav.data[i - 1] > 0) {
            // Left edge.
            edges.push([i - 1, 1]);
        }
        if (i < nav.data.length - 1 && nav.data[i + 1] > 0) {
            // Right edge.
            edges.push([i + 1, 1]);
        }
        if (i > nav.width && nav.data[i - nav.width] > 0) {
            // Top edge.
            edges.push([i - nav.width, 1]);
        }
        if (i < nav.data.length - nav.width && nav.data[i + nav.width] > 0) {
            // Bottom edge.
            edges.push([i + nav.width, 1]);
        }
    }

    instantiate(game, [
        local_transform2d([1, 19]),
        render2d("121.png"),
        order(0.5),
        move2d(3, 0),
        walk(1),
        callback((game, entity) => {
            let walk = game.World.Walk[entity];
            walk.DestinationNode = 107;
        }),
    ]);
}
