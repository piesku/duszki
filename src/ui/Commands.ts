import {html} from "../../lib/html.js";
import {Action} from "../actions.js";
import {GeneratorId, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {total_cost} from "../generator.js";
import {cost_fmt} from "./Overview.js";

export function Commands(game: Game) {
    return html`<div onmousedown="event.stopPropagation();" onmouseup="event.stopPropagation();">
        <button onclick="$(${Action.EnterPlaceRoad})">Road</button>
        <button onclick="$(${Action.EnterPlaceTree})">Tree</button>
        <button onclick="$(${Action.EnterErase})">Erase</button>
        <hr />

        ${BuildingButton(game, GeneratorId.Sleep)} ${BuildingButton(game, GeneratorId.Food)}
        ${BuildingButton(game, GeneratorId.Work)}

        <hr />
        <button onclick="$(${Action.ResetGame})">Reset</button>
        <em>Play time: ${(game.World.Age / 60).toFixed(0)} min.</em>
    </div>`;
}

function BuildingButton(game: Game, id: number) {
    let gen_config = GENERATORS[id];
    let gen_cost = total_cost(gen_config, game.GeneratorCounts[id]);
    return html`
        <button
            ${gen_cost > game.World.TotalWealth && "disabled"}
            onclick="$(${Action.EnterPlaceBuilding}, ${id})"
        >
            ${gen_config.Name} (${cost_fmt.format(gen_cost)}) — ${gen_config.Description}
        </button>
    `;
}
