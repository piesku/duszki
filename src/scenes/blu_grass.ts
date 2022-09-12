import {float} from "../../lib/random.js";
import {animate_sprite} from "../components/com_animate_sprite.js";
import {local_transform2d} from "../components/com_local_transform2d.js";
import {render2d} from "../components/com_render2d.js";
import {Game} from "../game.js";

const grass_tiles = ["000.png", "017.png", "034.png", "051.png"];

export function blueprint_grass(game: Game) {
    if (float() < 0.2) {
        return [local_transform2d(), render2d("068.png")];
    } else {
        let tiles = [...grass_tiles].sort(() => float() - 0.5);
        let frames: Record<string, number> = {};
        let time = 0;
        for (let i = 0; i < tiles.length; i++) {
            frames[tiles[i]] = time + float(0.4, 0.8);
        }
        return [local_transform2d(), render2d("000.png"), animate_sprite(frames)];
    }
}
