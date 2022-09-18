import {htm} from "../../lib/html.js";
import {Game} from "../game.js";

export function Advisor(game: Game) {
    return htm`<marquee
        style="
            font-size:25px;
            font-style:italic;
        "
    >
        ${game.PopulationSituation}
    </marquee>`;
}
