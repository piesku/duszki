import {Blueprint} from "../../lib/game.js";
import {map_house1} from "../../maps/map_house1.js";
import {map_house3} from "../../maps/map_house3.js";
import {map_mine1} from "../../maps/map_mine1.js";
import {children} from "../components/com_children.js";
import {control_player} from "../components/com_control_player.js";
import {disable} from "../components/com_disable.js";
import {generator} from "../components/com_generator.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {NeedType} from "../components/com_needs.js";
import {render2d, shift} from "../components/com_render2d.js";
import {satisfy} from "../components/com_satisfy.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {tiled_blueprints} from "../tiled.js";
import {Has} from "../world.js";

const building_maps = [map_house3, map_house1, map_mine1];

const window_sprites = ["079.png", "107.png", "108.png", "111.png", "112.png"];

// House satisfies sleep
// Farm satisfies food
// Rest defaults to Work
const needs: NeedType[] = [NeedType.SLEEP, NeedType.FOOD];

export const enum BuildingAttributes {
    Tiles = 0,
    Satisfier = 1,
    Lights = 2,
}

export const enum BuildingSatisfiers {
    Jezyczek = 0,
    Door = 1,
}

const capacities = {
    [NeedType.SLEEP]: 50,
    [NeedType.FOOD]: 50,
    [NeedType.WORK]: 50,
};

export function blueprint_building(game: Game, map_id: number) {
    let building_type = needs[map_id] || NeedType.WORK;
    let map = building_maps[map_id];

    let child_tiles: Array<Blueprint<Game>> = [];
    let light_tiles: Array<Blueprint<Game>> = [];
    for (let layer of map.Layers) {
        for (let [tile_name, tile] of tiled_blueprints(layer, map.Width, map.Height)) {
            child_tiles.push([spatial_node2d(), ...tile, shift(5)]);
            if (window_sprites.includes(tile_name)) {
                light_tiles.push([
                    spatial_node2d(),
                    ...tile,
                    // Render a quad under the window which will be lit up by sys_satisfy.
                    render2d("135.png", [0.3, 0.3, 0.3, 1]),
                    shift(-0.1),
                ]);
            }
        }
    }
    let modifier = map.Height === 5 ? 2 : 1;

    let jezyczek = [
        spatial_node2d(),
        local_transform2d([0, -Math.round(map.Height / 2) + modifier]),
    ];

    let door = [spatial_node2d(), local_transform2d([0, 0])];

    return [
        spatial_node2d(),
        local_transform2d(),
        control_player("building"),
        satisfy(building_type, capacities[building_type]),
        generator(map_id),
        disable(Has.Generator | Has.Satisfy),
        children(
            [spatial_node2d(), local_transform2d(), children(...child_tiles)],
            [spatial_node2d(), local_transform2d(), children(jezyczek, door)],
            [spatial_node2d(), local_transform2d(), children(...light_tiles)]
        ),
    ];
}
