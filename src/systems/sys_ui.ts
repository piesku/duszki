/**
 * # sys_ui
 *
 * Render the UI.
 *
 * The entire `App` UI component is evaluated every frame to a string. If the
 * result is different from the previous frame, the UI is re-rendered.
 *
 * Because `sys_ui` uses `innerHTML`, it's not a great choice for stateful UI
 * elements, like input forms.
 */

import {Game} from "../game.js";
import {App} from "../ui/App.js";

let prev: string;
let time_since_last_update = 1;

export function sys_ui(game: Game, delta: number) {
    time_since_last_update += delta;
    if (time_since_last_update > 1) {
        time_since_last_update = 0;
        let next = App(game);
        if (next !== prev) {
            game.Ui.innerHTML = prev = next;
        }
    }

    game.FollowContext.drawImage(
        game.SceneCanvas,
        10,
        game.ViewportHeight - 210,
        200,
        200,
        0,
        0,
        200,
        200
    );

    let minimap_image_data = game.MinimapContext.getImageData(
        0,
        0,
        game.World.Width,
        game.World.Height
    );

    for (let y = 0; y < game.World.Height; y++) {
        for (let x = 0; x < game.World.Width; x++) {
            let index = ((game.World.Height - y - 1) * game.World.Width + x) * 4;
            let cell = game.World.Grid[y][x];
            if (cell.Walkable) {
                minimap_image_data.data[index + 0] = 0;
                minimap_image_data.data[index + 1] = 0;
                minimap_image_data.data[index + 2] = 0;
                minimap_image_data.data[index + 3] = 255;
            } else if (cell.Pleasant) {
                minimap_image_data.data[index + 0] = 0;
                minimap_image_data.data[index + 1] = 255;
                minimap_image_data.data[index + 2] = 0;
                minimap_image_data.data[index + 3] = 255;
            } else if (cell.TileEntity) {
                minimap_image_data.data[index + 0] = 255;
                minimap_image_data.data[index + 1] = 0;
                minimap_image_data.data[index + 2] = 0;
                minimap_image_data.data[index + 3] = 255;
            } else {
                minimap_image_data.data[index + 0] = 255;
                minimap_image_data.data[index + 1] = 255;
                minimap_image_data.data[index + 2] = 255;
                minimap_image_data.data[index + 3] = 255;
            }
        }
    }

    game.MinimapContext.putImageData(minimap_image_data, 0, 0);
}
