import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_editable_dungeon} from "./scenes/sce_editable_dungeon.js";

let game = new Game();
scene_editable_dungeon(game);
game.Start();

// @ts-ignore
window.$ = dispatch.bind(null, game);

// @ts-ignore
window.game = game;
