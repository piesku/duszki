import {Entity} from "../../lib/world.js";
import {query_down} from "../components/com_children.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY_DUSZEK = Has.ControlAi | Has.Needs;
const QUERY_BUILDING = Has.Satisfy | Has.Generator;

export function sys_highlight(game: Game, delta: number) {
    // 1. Deselect all entities.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if (game.World.Signature[ent] & Has.Render2D) {
            let render = game.World.Render2D[ent];
            if (render.Color[3] > 1) {
                render.Color[3] = 1;
            }
        }
    }

    // 2. Highlight the selected entity.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if (ent === game.SelectedEntity) {
            if ((game.World.Signature[ent] & QUERY_DUSZEK) == QUERY_DUSZEK) {
                highlight_duszek(game, ent);
            } else if ((game.World.Signature[ent] & QUERY_BUILDING) == QUERY_BUILDING) {
                highlight_building(game, ent);
            }
        }
    }
}

function highlight_duszek(game: Game, entity: Entity) {
    // Highlight the selected entity.
    if (game.World.Signature[entity] & Has.Render2D) {
        let render = game.World.Render2D[entity];
        render.Color[3] = 2;
    }

    // Highlight the entity's needs.
    let needs = game.World.Needs[entity];
    {
        let target_entity = needs.Target[NeedType.FOOD];
        if (target_entity !== undefined) {
            for (let child_entity of query_down(game.World, target_entity, Has.Render2D)) {
                let render = game.World.Render2D[child_entity];
                render.Color[3] = 1.5;
            }
        }
    }
    {
        let target_entity = needs.Target[NeedType.SLEEP];
        if (target_entity !== undefined) {
            for (let child_entity of query_down(game.World, target_entity, Has.Render2D)) {
                let render = game.World.Render2D[child_entity];
                render.Color[3] = 1.5;
            }
        }
    }
    {
        let target_entity = needs.Target[NeedType.WORK];
        if (target_entity !== undefined) {
            for (let child_entity of query_down(game.World, target_entity, Has.Render2D)) {
                let render = game.World.Render2D[child_entity];
                render.Color[3] = 1.5;
            }
        }
    }

    // Highlight the entity's path, except the last waypoint (the door).
    let walk = game.World.Walk[entity];
    for (let i = 0; i < walk.Path.length - 1; i++) {
        let cell = walk.Path[i];
        let ratio = (i + 1) / walk.Path.length;
        if (cell.Walkable && cell.TileEntity !== null) {
            let render = game.World.Render2D[cell.TileEntity];
            render.Color[3] = 1.2 + ratio / 3;
        }
    }
}

function highlight_building(game: Game, entity: Entity) {
    for (let child_entity of query_down(game.World, entity, Has.Render2D)) {
        let render = game.World.Render2D[child_entity];
        render.Color[3] = 1.5;
    }
}
