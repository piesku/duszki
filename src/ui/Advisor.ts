import {html} from "../../lib/html.js";
import {Game} from "../game.js";

export function Advisor(game: Game) {
    if (game.PopulationSituation) {
        return html`<marquee
            style="
                color: red;
                font-weight: bold;
                font-style: italic;
            "
        >
            ${game.PopulationSituation}
        </marquee>`;
    } else {
        return "";
    }
}
