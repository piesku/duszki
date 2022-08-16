import {instantiate} from "../../lib/game.js";
import {path_find} from "../../lib/pathfind.js";
import {map_sample} from "../../maps/map_sample.js";
import {local_transform2d, set_position} from "../components/com_local_transform2d.js";
import {Edge, navigable} from "../components/com_navigable.js";
import {order, render2d} from "../components/com_render2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {instantiate_tiled_layer} from "../tiled.js";
import {World} from "../world.js";
import {blueprint_camera} from "./blu_camera.js";
import {blueprint_cursor} from "./blu_cursor.js";

export function scene_dungeon(game: Game) {
    game.World = new World(WORLD_CAPACITY);
    game.ViewportResized = true;

    // Camera.
    instantiate(game, [
        ...blueprint_camera(game),
        set_position(game.SceneWidth / 2, game.SceneHeight / 2),
    ]);

    // Cursor.
    instantiate(game, [
        ...blueprint_cursor(game),
        set_position(game.SceneWidth / 2, game.SceneHeight / 2),
    ]);

    // Terrain.
    instantiate_tiled_layer(game, map_sample.layers[0], 0.1);

    // Objects.
    instantiate_tiled_layer(game, map_sample.layers[1], 0.2);
    instantiate_tiled_layer(game, map_sample.layers[2], 0.3);

    let nav = map_sample.layers[3];
    for (let i = 0; i < nav.data.length; i++) {
        let tile = nav.data[i];
        if (tile == 0) {
            // Impassable.
            continue;
        }

        let edges: Array<Edge> = [];
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

        let x = i % nav.width;
        let y = nav.height - Math.floor(i / nav.width);
        instantiate(game, [local_transform2d([x, y]), navigable(i, edges, [x, y])]);
    }

    let path = path_find(game.World, 1, 107);
    if (path) {
        for (let waypoint of path) {
            let waypoint_entity = game.World.NodeToEntity[waypoint];
            render2d("121.png")(game, waypoint_entity);
            order(1)(game, waypoint_entity);
        }
    }
}
