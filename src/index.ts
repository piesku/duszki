import {dispatch} from "./actions.js";
import {Game} from "./game.js";
import {scene_editable_dungeon} from "./scenes/sce_editable_dungeon.js";
import {connect, get} from "./store.js";

const DEFAULT_WORLD_ID = 0;

async function main() {
    let db = await connect();
    let game = new Game(db);

    let param_id = new URL(location.href).searchParams.get("id");
    let world_id = param_id ? parseInt(param_id) : DEFAULT_WORLD_ID;
    let saved_world = await get(db, world_id);
    if (saved_world) {
        game.World = saved_world;
    } else {
        game.World.id = world_id;
        scene_editable_dungeon(game);
    }

    game.ViewportResized = true;
    game.Start();

    // @ts-ignore
    window.$ = dispatch.bind(null, game);
}

main();
