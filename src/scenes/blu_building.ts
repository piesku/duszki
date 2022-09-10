import {Blueprint} from "../../lib/game.js";
import {map_farm1} from "../../maps/map_farm1.js";
import {map_house1} from "../../maps/map_house1.js";
import {map_mine1} from "../../maps/map_mine1.js";
import {map_mine2} from "../../maps/map_mine2.js";
import {map_mine3} from "../../maps/map_mine3.js";
import {map_mine4} from "../../maps/map_mine4.js";
import {map_mine5} from "../../maps/map_mine5.js";
import {children} from "../components/com_children.js";
import {control_player} from "../components/com_control_player.js";
import {disable} from "../components/com_disable.js";
import {generator} from "../components/com_generator.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {NeedType} from "../components/com_needs.js";
import {shift} from "../components/com_render2d.js";
import {satisfy} from "../components/com_satisfy.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {tiled_blueprints} from "../tiled.js";
import {Has} from "../world.js";

const building_maps = [
    map_house1,
    map_farm1,
    map_mine1,
    map_mine2,
    map_mine3,
    map_mine4,
    map_mine5,
];

// House satisfies sleep
// Farm satisfies food
// Rest defaults to Work
const needs: NeedType[] = [NeedType.SLEEP, NeedType.FOOD];

const capacities = {
    [NeedType.SLEEP]: 50,
    [NeedType.FOOD]: 50,
    [NeedType.WORK]: 50,
};

export function blueprint_building(game: Game, map_id: number) {
    let building_type = needs[map_id] || NeedType.WORK;
    let child_tiles: Array<Blueprint<Game>> = [];
    let map = building_maps[map_id];

    for (let layer of map.Layers) {
        for (let tile of tiled_blueprints(layer, map.Width, map.Height)) {
            child_tiles.push([spatial_node2d(), ...tile, shift(5)]);
        }
    }
    let modifier = map.Height === 5 ? 2 : 1;

    child_tiles.push([
        // draw_rect(DrawContext.Foreground, "blue"),
        spatial_node2d(),
        local_transform2d([0, -Math.round(map.Height / 2) + modifier]),
        satisfy(building_type, capacities[building_type]),
    ]);

    return [
        spatial_node2d(),
        local_transform2d(),
        control_player("building"),
        children(...child_tiles),
        generator(map_id),
        disable(Has.Generator),
    ];
}
