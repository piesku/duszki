import {Vec2} from "../../lib/math.js";
import {element} from "../../lib/random.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Walk | Has.Needs;

let walkables: Vec2[] = [];
export function sys_control_ai(game: Game, delta: number) {
    walkables = [];
    for (let y = 0; y < game.World.Grid.length; y++) {
        for (let x = 0; x < game.World.Grid[y].length; x++) {
            if (game.World.Grid[y][x].walkable) {
                walkables.push([x, y]);
            }
        }
    }

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }
}

function update(game: Game, entity: number, delta: number) {
    let walk = game.World.Walk[entity];
    let needs = game.World.Needs[entity];

    if (needs.Food < 0.001) {
        console.log("duszek umar z głodu");
        destroy_all(game.World, entity);
        return;
    }

    if (walk.DestinationTrigger === null && walk.Path.length === 0) {
        walk.DestinationTrigger = element(walkables);
    }
}
