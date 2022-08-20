import {instantiate} from "../../lib/game.js";
import {integer} from "../../lib/random.js";
import {set_position} from "../components/com_local_transform2d.js";
import {Game, WORLD_CAPACITY} from "../game.js";
import {instantiate_tiled_layer} from "../tiled.js";
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

    // Terrain.
    instantiate_tiled_layer(
        game,
        new Array(game.World.Width * game.World.Height).fill(1),
        game.World.Width,
        0.1
    );

    // Objects.
    // instantiate_tiled_layer(game, map_sample.Layers[1], map_sample.Width, 0.6);
    // instantiate_tiled_layer(game, map_sample.Layers[2], map_sample.Width, 0.7);

    // let nav = map_sample.Navigation;
    // for (let i = 0; i < nav.length; i++) {
    //     let tile = nav[i];
    //     if (tile == 0) {
    //         // Impassable.
    //         continue;
    //     }

    //     // Createa a new navigation node.
    //     game.World.Navigation.Centroids[i] = node_to_position(game.World, i);
    //     game.World.Navigation.Graph[i] = [];

    //     let edges = game.World.Navigation.Graph[i];
    //     if (i > 0 && nav[i - 1] > 0) {
    //         // Left edge.
    //         edges.push([i - 1, 1]);
    //     }
    //     if (i < nav.length - 1 && nav[i + 1] > 0) {
    //         // Right edge.
    //         edges.push([i + 1, 1]);
    //     }
    //     if (i < nav.length - map_sample.Width && nav[i + map_sample.Width] > 0) {
    //         // Top edge.
    //         edges.push([i + map_sample.Width, 1]);
    //     }
    //     if (i > map_sample.Width && nav[i - map_sample.Width] > 0) {
    //         // Bottom edge.
    //         edges.push([i - map_sample.Width, 1]);
    //     }
    // }

    // {
    //     // Duszki.
    //     let node_ids = [];
    //     for (let i = 0; i < game.World.Navigation.Graph.length; i++) {
    //         if (game.World.Navigation.Graph[i]) {
    //             node_ids.push(i);
    //         }
    //     }

    let duszki = 10;
    for (let i = 0; i < duszki; i++) {
        let x = integer(0, game.World.Width - 1);
        let y = integer(0, game.World.Height - 1);

        instantiate(game, [...blueprint_duszek(game), set_position(x, y)]);
    }
}
