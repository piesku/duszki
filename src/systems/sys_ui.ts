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
import {Advisor} from "../ui/Advisor.js";
import {Commands} from "../ui/Commands.js";
import {Details} from "../ui/Details.js";
import {Overview} from "../ui/Overview.js";

let nexts: Array<string> = [];
let prevs: Array<string> = [];
let time_since_last_update = 1;

export function sys_ui(game: Game, delta: number) {
    time_since_last_update += delta;
    if (time_since_last_update > 1) {
        time_since_last_update = 0;

        nexts[0] = Overview(game);
        nexts[2] = Commands(game);
        nexts[3] = Advisor(game);
    }

    // Details are updated every frame.
    nexts[1] = Details(game);

    for (let i = 0; i < nexts.length; i++) {
        if (nexts[i] !== prevs[i]) {
            game.Ui.children[i].innerHTML = prevs[i] = nexts[i];
        }
    }

    game.FollowContext.drawImage(game.SceneCanvas, 10, 10, 200, 200, 0, 0, 200, 200);

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
                minimap_image_data.data[index + 0] = 182;
                minimap_image_data.data[index + 1] = 172;
                minimap_image_data.data[index + 2] = 82;
                minimap_image_data.data[index + 3] = 255;
            } else if (cell.Pleasant) {
                minimap_image_data.data[index + 0] = 54;
                minimap_image_data.data[index + 1] = 126;
                minimap_image_data.data[index + 2] = 81;
                minimap_image_data.data[index + 3] = 255;
            } else if (cell.TileEntity) {
                minimap_image_data.data[index + 0] = 163;
                minimap_image_data.data[index + 1] = 57;
                minimap_image_data.data[index + 2] = 0;
                minimap_image_data.data[index + 3] = 255;
            } else {
                minimap_image_data.data[index + 0] = 88;
                minimap_image_data.data[index + 1] = 151;
                minimap_image_data.data[index + 2] = 64;
                minimap_image_data.data[index + 3] = 255;
            }
        }
    }

    game.MinimapContext.putImageData(minimap_image_data, 0, 0);

    let camera_entity = game.Cameras[0];
    if (camera_entity !== undefined) {
        let camera_local = game.World.LocalTransform2D[camera_entity];
        let x = camera_local.Translation[0];
        let y = camera_local.Translation[1];
        let visible_width = game.ViewportWidth / game.UnitSize;
        let visible_height = game.ViewportHeight / game.UnitSize;

        game.MinimapContext.strokeStyle = "#fff";
        game.MinimapContext.strokeRect(
            Math.round(x - visible_width / 2) + 0.5,
            Math.round(game.World.Height - y - visible_height / 2) + 0.5,
            Math.round(visible_width),
            Math.round(visible_height)
        );
    }
}
