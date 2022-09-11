import {html} from "../../lib/html.js";
import {query_down} from "../components/com_children.js";
import {NeedType} from "../components/com_needs.js";
import {GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {LOW_SATISFY_THRESHOLD} from "../systems/sys_satisfy.js";
import {Has} from "../world.js";

export function Details(game: Game) {
    if (game.SelectedEntity === null) {
        return "";
    }

    let entity = game.SelectedEntity;
    if (
        (game.World.Signature[entity] & (Has.ControlAi | Has.Needs)) ==
        (Has.ControlAi | Has.Needs)
    ) {
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
        let generator = game.World.Generator[entity];
        let satisfy;
        for (let child_entity of query_down(game.World, entity, Has.Satisfy)) {
            satisfy = game.World.Satisfy[child_entity];
            let occupancy = satisfy.Ocupados.length / satisfy.Capacity;
            return html`
                <label>${GENERATORS[generator.Id].Name}</label>
                <label>Occupancy <meter value="${occupancy}"></meter></label>
            `;
        }
        return "";
    }
}
