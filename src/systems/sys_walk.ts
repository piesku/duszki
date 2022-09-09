import {Vec2} from "../../lib/math.js";
import {path_find} from "../../lib/pathfind.js";
import {add, length, normalize, subtract} from "../../lib/vec2.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.LocalTransform2D | Has.Walk | Has.Move2D;

export function sys_walk(game: Game, delta: number) {
    for (let y = 0; y < game.World.Grid.length; y++) {
        for (let x = 0; x < game.World.Grid[y].length; x++) {
            let cell = game.World.Grid[y][x];
            // 10-second moving average of occupants.
            let weight = Math.min(1, delta / 10);
            cell.TrafficIntensity += (cell.Ocupados.length - cell.TrafficIntensity) * weight;
            cell.Ocupados = [];
        }
    }

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent);
        }
    }
}

const diff: Vec2 = [0, 0];

function update(game: Game, entity: Entity) {
    let walk = game.World.Walk[entity];
    let local = game.World.LocalTransform2D[entity];

    let x = Math.round(local.Translation[0]);
    let y = Math.round(local.Translation[1]);
    let cell = game.World.Grid[y][x];
    cell.Ocupados.push(entity);

    if (walk.DestinationTrigger !== null) {
        // Search FROM the goal TO the origin, so that the waypoints are ordered
        // from the one closest to the origin.
        //console.time("path_find");
        let path = path_find(game.World, walk.DestinationTrigger, cell);
        //console.timeEnd("path_find")
        if (path) {
            // Discard the first waypoint, which is always the origin node.
            walk.Path = path.slice(1);
        }

        walk.DestinationTrigger = null;
    }

    if (walk.Path.length > 0) {
        let local = game.World.LocalTransform2D[entity];
        let next_cell = walk.Path[0];

        if (!next_cell.Walkable) {
            walk.Path = [];
        }

        subtract(diff, next_cell.Position, local.Translation);
        if (length(diff) < 0.1) {
            // We are close enough to the next waypoint.
            walk.Path.shift();
        } else {
            let move = game.World.Move2D[entity];
            normalize(diff, diff);
            add(move.Direction, move.Direction, diff);
            game.World.Signature[entity] |= Has.Dirty;
        }
    }
}
