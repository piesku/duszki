import {World} from "../src/world.js";
import {EPSILON} from "./math.js";
import {distance_squared} from "./vec2.js";

type VectorField = Array<number>;

/**
 * A* path-finding among Navigable entities.
 *
 * @param world - The World with LocalTransform2D and Navigable component data.
 * @param origin - The start node.
 * @param goal - The destination node.
 */
export function path_find(world: World, origin: number, goal: number) {
    let predecessors: VectorField = [];

    let goal_entity = world.NodeToEntity[goal];
    let goal_navigable = world.Navigable[goal_entity];

    // The cost from the origin for each visited node (G).
    let g: Array<number> = [];
    g[origin] = 0;
    // The heuristic to the goal for each visited node (H).
    let h: Array<number> = [];
    h[origin] = 0;
    // The total cost for each visited node (F).
    let f: Array<number> = [];
    f[origin] = 0;

    // The queue of neighboring nodes to visit next.
    let boundary = [origin];
    while (boundary.length > 0) {
        // Pick the next node with the lowest F cost.
        let lowest = lowest_cost(boundary, f);
        let current = boundary.splice(lowest, 1)[0];

        if (current === goal) {
            // We've reached the goal. Return an array of nodes from the goal to
            // the destination.
            return [...path_follow(predecessors, goal)];
        }

        let current_entity = world.NodeToEntity[current];
        let current_navigable = world.Navigable[current_entity];

        // For every neighbor `next` of the current node…
        for (let i = 0; i < current_navigable.Edges.length; i++) {
            let next = current_navigable.Edges[i][0];
            let cost = current_navigable.Edges[i][1];
            // The G cost of getting from the origin to `next` is the G cost of
            // the current node plus the cost of getting from the current node
            // to `next`.
            let g_next = g[current] + cost;
            if (g[next] === undefined) {
                // We've never visited this neighboring node before. Update the
                // G cost, compute the H cost, compute the F cost.
                let next_entity = world.NodeToEntity[next];
                let next_navigable = world.Navigable[next_entity];
                h[next] = distance_squared(
                    next_navigable.WorldPosition,
                    goal_navigable.WorldPosition
                );
                g[next] = g_next;
                f[next] = g_next + h[next];
                // Record that we've reached this neighbor from the current
                // node. This will be used to trace the entire path from the
                // goal back to the origin.
                predecessors[next] = current;
                // Add the neighbor to the queue.
                boundary.push(next);
            } else if (g_next + EPSILON < g[next]) {
                // We visited this neighboring node before, but we arrived at it
                // via a detour. We now have a better path to it from the
                // origin, manifested by a better G cost. Recompute the F cost.
                g[next] = g_next;
                f[next] = g_next + h[next];
                // Record that we've reached this neighbor from the current
                // node, rather than the one recorded previously.
                predecessors[next] = current;
            }
        }
    }

    // No path from the origin to the goal could be found.
    return false;
}

// Linearly search for the index of the element of `boundary` with the lowest
// cost in `cost`.
function lowest_cost(boundary: Array<number>, cost: Array<number>) {
    let min = 0;
    for (let i = 0; i < boundary.length; i++) {
        if (cost[boundary[i]] + EPSILON < cost[boundary[min]]) {
            min = i;
        }
    }
    return min;
}

// Follow the path from the goal back to the origin by tracing the predecessors
// recorded for each node of the graph.
function* path_follow(path: VectorField, goal: number) {
    while (goal !== undefined) {
        yield goal;
        goal = path[goal];
    }
}
