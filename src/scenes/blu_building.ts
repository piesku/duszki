import {Blueprint} from "../../lib/game.js";
import {map_domek01} from "../../maps/map_domek01.js";
import {map_domek02} from "../../maps/map_domek02.js";
import {children} from "../components/com_children.js";
import {control_player} from "../components/com_control_player.js";
import {disable} from "../components/com_disable.js";
import {generator} from "../components/com_generator.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {satisfy} from "../components/com_satisfy.js";
import {spatial_node2d} from "../components/com_spatial_node2d.js";
import {Game} from "../game.js";
import {tiled_blueprints} from "../tiled.js";
import {Has} from "../world.js";

const building_maps = [map_domek01, map_domek02];

export function blueprint_building(game: Game, map_id: number, z: number) {
    let child_tiles: Array<Blueprint<Game>> = [];
    let map = building_maps[map_id];
    for (let layer of map.Layers) {
        for (let tile of tiled_blueprints(layer, map.Width, map.Height, z)) {
            child_tiles.push([spatial_node2d(), ...tile]);
        }
    }

    child_tiles.push([
        spatial_node2d(),
        local_transform2d([0, -Math.round(map.Width / 2) - 1]),
        satisfy("Food"),
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
