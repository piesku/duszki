import {html} from "../../lib/html.js";
import {Game} from "../game.js";
import {SQUARE_LIFESPAN} from "../scenes/blu_square.js";

export function App(game: Game) {
    return html`
        <div style="margin: 10px;">
            <div>Click to spawn new duszki.</div>
            <div>Use the arrow keys to move all duszki at once.</div>
            <div>A duszek lives for ${SQUARE_LIFESPAN} seconds.</div>
        </div>
    `;
}
