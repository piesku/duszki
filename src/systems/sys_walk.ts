import {Vec2} from "../../lib/math.js";
import {path_find} from "../../lib/pathfind.js";
import {add, length, normalize, subtract} from "../../lib/vec2.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.LocalTransform2D | Has.Walk | Has.Move2D;

export function sys_walk(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            update(game, ent);
        }
    }
}

function update(game: Game, entity: Entity) {
    let nav = game.World.Navigation;
    let walk = game.World.Walk[entity];
    if (walk.DestinationNode !== null) {
        console.time("path_find");
        // Search FROM the goal TO the origin, so that the waypoints are ordered
        // from the one closest to the origin.
        let path = path_find(nav, walk.DestinationNode, walk.CurrentNode);
        console.timeEnd("path_find");
        if (path) {
            // Discard the first waypoint, which is always the origin node.
            walk.Path = path.slice(1);
        }

        walk.DestinationNode = null;
    }

    if (walk.Path.length > 0) {
        let local = game.World.LocalTransform2D[entity];
        let next = walk.Path[0];

        let diff: Vec2 = [0, 0];
        subtract(diff, nav.Centroids[next], local.Translation);
        if (length(diff) < 0.1) {
            // We are close enough to the next waypoint.
            walk.Path.shift();

            if (walk.Path.length == 0) {
                // We have reached the destination.
                walk.CurrentNode = next;
                walk.DestinationNode = null;
            }
        } else {
            let move = game.World.Move2D[entity];
            normalize(diff, diff);
            add(move.Direction, move.Direction, diff);
            game.World.Signature[entity] |= Has.Dirty;
        }
    }
}
