import {html} from "../../lib/html.js";
import {Entity} from "../../lib/world.js";
import {Action} from "../actions.js";
import {NeedType} from "../components/com_needs.js";
import {GeneratorId, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {total_cost} from "../generator.js";
import {LOW_SATISFY_THRESHOLD} from "../systems/sys_satisfy.js";
import {Has} from "../world.js";

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
            padding: 150px 10px;
            background: #9999;
            backdrop-filter: blur(10px);
            color: white;
            display: flex;
            flex-flow: column;
            justify-content: space-between;
        "
    >
        <div>
            <h3>${game.PopulationSituation}</h3>
            <label>Wealth: ${cost_fmt.format(game.World.TotalWealth)}</label>
            <label>Income: ${cost_fmt.format(game.IncomePerSecond)}/s</label>
            <button onclick="$(${Action.EnterErase})">❌ Remove</button>
            <button onclick="$(${Action.EnterPlaceRoad})">🛣 Road</button>
            <button onclick="$(${Action.EnterPlaceTree})">🌳 Tree</button>
            ${BuildingButton(game, GeneratorId.House)} ${BuildingButton(game, GeneratorId.Farm)}
            ${BuildingButton(game, GeneratorId.Mine1)} ${BuildingButton(game, GeneratorId.Mine2)}
            ${BuildingButton(game, GeneratorId.Mine3)}
            <button onclick="$(${Action.ResetGame})">Reset</button>
            <hr />
        </div>
        <div>
            ${WorldStats(game)}
            <hr />
        </div>
        <div>${game.SelectedEntity !== null && DuszekDetails(game, game.SelectedEntity)}</div>
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

function WorldStats(game: Game) {
    return html`
        <label>Population: ${game.World.Population.toFixed(0)}</label>
        <label>At work/Total: ${game.World.DuszkiWorking}/${game.World.DuszkiAlive}</label>
        <label>Mortality: ${game.World.Mortality.toFixed(3)}</label>
        <label>Happiness <meter value="${game.World.Happiness}"></meter></label>
        <label>Nutrition <meter value="${game.World.Nutrition}"></meter></label>
        <label>Restedness <meter value="${game.World.Restedness}"></meter></label>
    `;
}

function DuszekDetails(game: Game, entity: Entity) {
    if (game.World.Signature[entity] & Has.Needs) {
        let needs = game.World.Needs[entity];
        let control = game.World.ControlAi[entity];
        return html`
            <label>${control.Name}</label>
            <label><em>${control.Says}</em></label>
            <label
                >Happy
                <meter value="${needs.Value[NeedType.HAPPY]}" low="${LOW_SATISFY_THRESHOLD}"></meter
            ></label>
            <label
                >Fed
                <meter value="${needs.Value[NeedType.FOOD]}" low="${LOW_SATISFY_THRESHOLD}"></meter
            ></label>
            <label
                >Rested
                <meter value="${needs.Value[NeedType.SLEEP]}" low="${LOW_SATISFY_THRESHOLD}"></meter
            ></label>
        `;
    } else {
        return "";
    }
}
