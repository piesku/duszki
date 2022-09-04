import {Vec2} from "../../lib/math.js";
import {element} from "../../lib/random.js";
import {Action, dispatch} from "../actions.js";
import {destroy_all} from "../components/com_children.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Walk | Has.Needs;

let walkables: Vec2[] = [];

let mortality_check_interval = 1;
let time_since_last_check = 0;
let deaths_since_last_check = 0;

export function sys_control_ai(game: Game, delta: number) {
    walkables = [];
    for (let y = 0; y < game.World.Grid.length; y++) {
        for (let x = 0; x < game.World.Grid[y].length; x++) {
            if (game.World.Grid[y][x].Walkable) {
                walkables.push([x, y]);
            }
        }
    }

    let duszki_count = game.World.DuszkiAlive;

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent, delta);
        }
    }

    deaths_since_last_check += duszki_count - game.World.DuszkiAlive;

    // Compute mortality CMA.
    time_since_last_check += delta;
    if (time_since_last_check > mortality_check_interval) {
        game.World.Age += time_since_last_check;
        game.World.Mortality += (deaths_since_last_check - game.World.Mortality) / game.World.Age;
        deaths_since_last_check = 0;
        time_since_last_check = 0;
    }
}

function update(game: Game, entity: number, delta: number) {
    let walk = game.World.Walk[entity];
    let needs = game.World.Needs[entity];
    let local = game.World.LocalTransform2D[entity];

    if (needs.food < 0.001) {
        console.log("duszek umar z głodu");
        dispatch(game, Action.DuszekDied, local.Translation);

        destroy_all(game.World, entity);
        return;
    }

    if (needs.sleep < 0.001) {
        console.log("duszek umar z wycieczenia");
        dispatch(game, Action.DuszekDied, local.Translation);
        destroy_all(game.World, entity);
        return;
    }

    // Can you die from not enough work?
    // if (needs.Work < 0.001) {
    //     console.log("duszek umar z nudów");
    //     game.DuszkiCount--;
    //     destroy_all(game.World, entity);
    //     return;
    // }

    if (walkables.length > 0 && walk.DestinationTrigger === null && walk.Path.length === 0) {
        walk.DestinationTrigger = element(walkables);
    }
}
