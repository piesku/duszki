import {html} from "../../lib/html.js";
import {Action} from "../actions.js";
import {GeneratorId, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {total_cost} from "../generator.js";

const cost_fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

export function App(game: Game) {
    return html`<div
        onmousedown="event.stopPropagation();"
        onmouseup="event.stopPropagation();"
        onclick="$(${Action.MinimapNavigation}, event);"
        style="
            position: absolute;
            inset: 0;
            width: 200px;
            padding: 220px 10px;
            background: #9999;
            backdrop-filter: blur(10px);
            color: white;
        "
    >
        <button onclick="$(${Action.EnterErase})">❌ Remove</button>
        <button onclick="$(${Action.EnterPlaceRoad})">🛣 Road</button>
        <button onclick="$(${Action.EnterPlaceTree})">🌳 Tree</button>
        ${BuildingButton(game, GeneratorId.House)} ${BuildingButton(game, GeneratorId.Farm)}
        ${BuildingButton(game, GeneratorId.Mine1)} ${BuildingButton(game, GeneratorId.Mine2)}
        ${BuildingButton(game, GeneratorId.Mine3)}
        <button onclick="$(${Action.ResetGame})">Reset</button>
        <hr />
        Income: ${cost_fmt.format(game.IncomePerSecond)}/s — Wealth:
        ${cost_fmt.format(game.World.TotalWealth)} — Working duszki: ${game.World.DuszkiWorking} /
        ${game.World.DuszkiAlive} — Mortality: ${game.World.Mortality} duszki/s
    </div>`;
}

function BuildingButton(game: Game, id: number) {
    let gen_config = GENERATORS[id];
    let gen_cost = total_cost(gen_config, game.GeneratorCounts[id], 1);
    return html`
        <button
            ${gen_cost > game.World.TotalWealth && "disabled"}
            onclick="$(${Action.EnterPlaceBuilding}, ${id})"
        >
            ${gen_config.Name} (${cost_fmt.format(gen_cost)})
        </button>
    `;
}
