import {Game} from "../game.js";
import {put} from "../store.js";

const INTERVAL = 5;
let since_last = 0;

export function sys_save(game: Game, delta: number) {
    since_last += delta;
    if (since_last > INTERVAL) {
        since_last = 0;
        put(game.Store, game.World);
    }
}
