import {html} from "../../lib/html.js";
import {Game} from "../game.js";

export const cost_fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

export function Overview(game: Game) {
    return html`<div>
        <label>Wealth: ${cost_fmt.format(game.World.TotalWealth)}</label>
        <label>Income: ${cost_fmt.format(game.IncomePerSecond)}/s</label>
        <hr />
        <label>Population: ${game.World.Population.toFixed(0)}</label>
        <label>Immigration: ${(game.World.Immigration * 60).toFixed(0)}/min</label>
        <label>Mortality: ${(game.World.Mortality * 60).toFixed(0)}/min</label>
        <hr />
        <label
            >Happiness: ${game.FrameStats.DuszkiUnhappy} unhappy
            <meter value="${game.World.Happiness}"></meter
        ></label>
        <label
            >Nutrition: ${game.FrameStats.DuszkiHungry} hungry
            <meter value="${game.World.Nutrition}"></meter
        ></label>
        <label
            >Restedness: ${game.FrameStats.DuszkiTired} tired
            <meter value="${game.World.Restedness}"></meter
        ></label>
        <label
            >Employment: ${game.World.DuszkiWorking} at work
            <meter value="${game.World.Employment}"></meter
        ></label>
    </div>`;
}
