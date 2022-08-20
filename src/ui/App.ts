import {html} from "../../lib/html.js";
import {Action} from "../actions.js";
import {Game} from "../game.js";

export function App(game: Game) {
    return html`<div onmousedown="event.stopPropagation();" onmouseup="event.stopPropagation();">
        <button onmouseup="$(${Action.EnterBuild}, 0)">Domek01</button>
        <button onmouseup="$(${Action.EnterBuild}, 1)">Domek02</button>
    </div>`;
}
