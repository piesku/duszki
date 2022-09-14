import {element} from "../../lib/random.js";
import {Tile} from "../../sprites/spritesheet.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d} from "../components/com_render2d.js";
import {Game} from "../game.js";

const grass_tiles = [Tile.Grass1, Tile.Grass1, Tile.Grass2, Tile.Grass2, Tile.Flowers];

export function blueprint_grass(game: Game) {
    return [local_transform2d(), render2d(element(grass_tiles))];
}

export function blueprint_empty(game: Game) {
    return [local_transform2d(), render2d(Tile.Empty)];
}
