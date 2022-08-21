import {position_to_node, World} from "../src/world.js";
import {EPSILON, Vec2} from "./math.js";
import {distance_squared} from "./vec2.js";

type VectorField = number[][];

export interface Navigation {
    Graph: Array<Array<[dest: number, cost: number]>>;
    Centroids: Array<Vec2>;
}

/**
 * A* path-finding.
 *
 * @param nav - The Navigation object with the graph of navigable nodes.
 * @param origin - The start node.
 * @param goal - The destination node.
 */
export function path_find(world: World, origin: Vec2, goal: Vec2) {
    let nav = world.Grid;
    let predecessors: VectorField = [];

    let origin_node = position_to_node(world, origin);
    // The cost from the origin for each visited node (G).
    let g: Array<number> = [];
    g[origin_node] = 0;
    // The heuristic to the goal for each visited node (H).
    let h: Array<number> = [];
    h[origin_node] = 0;
    // The total cost for each visited node (F).
    let f: Array<number> = [];
    f[origin_node] = 0;

    // The queue of neighboring nodes to visit next.
    let boundary = [origin];
    while (boundary.length > 0) {
        // Pick the next node with the lowest F cost.
        let lowest = lowest_cost(world, boundary, f);
        let current = boundary.splice(lowest, 1)[0];

        if (position_to_node(world, current) === position_to_node(world, goal)) {
            // We've reached the goal. Return an array of nodes from the goal to
            // the destination.
            return [...path_follow(world, predecessors, goal)];
        }

        let neighbors = [
            [current[0] + 1, current[1]],
            [current[0] - 1, current[1]],
            [current[0], current[1] + 1],
            [current[0], current[1] - 1],
        ].filter(([x, y]) => {
            return world.Grid[y] && world.Grid[y][x] && world.Grid[y][x].walkable;
        });

        for (let i = 0; i < neighbors.length; i++) {
            let next = neighbors[i] as Vec2;
            let cost = 1;
            let current_node = position_to_node(world, current);
            let next_node = position_to_node(world, next);
            // The G cost of getting from the origin to `next` is the G cost of
            // the current node plus the cost of getting from the current node
            // to `next`.
            let g_next = g[current_node] + cost;
            if (g[next_node] === undefined) {
                // We've never visited this neighboring node before. Update the
                // G cost, compute the H cost, compute the F cost.
                h[next_node] = distance_squared(next, goal);
                g[next_node] = g_next;
                f[next_node] = g_next + h[next_node];
                // Record that we've reached this neighbor from the current
                // node. This will be used to trace the entire path from the
                // goal back to the origin.
                predecessors[next_node] = current;
                // Add the neighbor to the queue.
                boundary.push(next);
            } else if (g_next + EPSILON < g[next_node]) {
                // We visited this neighboring node before, but we arrived at it
                // via a detour. We now have a better path to it from the
                // origin, manifested by a better G cost. Recompute the F cost.
                g[next_node] = g_next;
                f[next_node] = g_next + h[next_node];
                // Record that we've reached this neighbor from the current
                // node, rather than the one recorded previously.
                predecessors[next_node] = current;
            }
        }
    }

    // No path from the origin to the goal could be found.
    return false;
}

// Linearly search for the index of the element of `boundary` with the lowest
// cost in `cost`.
function lowest_cost(world: World, boundary: Array<Vec2>, cost: Array<number>) {
    let min = 0;
    for (let i = 0; i < boundary.length; i++) {
        if (
            cost[position_to_node(world, boundary[i])] + EPSILON <
            cost[position_to_node(world, boundary[min])]
        ) {
            min = i;
        }
    }
    return min;
}

// Follow the path from the goal back to the origin by tracing the predecessors
// recorded for each node of the graph.
function* path_follow(world: World, path: VectorField, goal: Vec2) {
    while (goal !== undefined) {
        yield goal;
        goal = path[position_to_node(world, goal)] as Vec2;
    }
}
