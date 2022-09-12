import {html} from "../../lib/html.js";
import {Game} from "../game.js";

export function Dialog(game: Game, message: string) {
    return html`
        <dialog
            open
            style="
                position: absolute;
                inset: 0;
                width: 400px;
                border-radius: 10px;
                background: #66e9;
                backdrop-filter: blur(10px);
                text-align: center;
                color: #fff;
            "
        >
            <p>${message}</p>
            <form method="dialog">
                <button type="submit">OK</button>
            </form>
        </dialog>
    `;
}
