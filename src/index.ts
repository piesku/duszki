import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_editable_dungeon} from "./scenes/sce_editable_dungeon.js";
import {connect, get} from "./store.js";

async function main() {
    let db = await connect();
    let game = new Game(db);

    let save = await get(db, 0);
    if (save) {
        game.World = save;
        game.ViewportResized = true;
    } else {
        scene_editable_dungeon(game);
    }

    game.Start();

    // @ts-ignore
    window.$ = dispatch.bind(null, game);

    // @ts-ignore
    window.game = game;
}

main();
