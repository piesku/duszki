import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_editable_dungeon} from "./scenes/sce_editable_dungeon.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {connect} from "./store.js";

connect().then((db) => {
    let game = new Game(db);
    scene_editable_dungeon(game);
    false && scene_stage(game);

    game.Start();

    // @ts-ignore
    window.$ = dispatch.bind(null, game);

    // @ts-ignore
    window.game = game;
});
