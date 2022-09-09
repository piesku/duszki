import {GridCell, World} from "../src/world.js";
import {EPSILON} from "./math.js";
import {distance_squared} from "./vec2.js";

type VectorField = Array<GridCell>;

const TRAFFIC_FACTOR = 100;
const neighbor_offsets = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

/**
 * A* path-finding.
 *
 * @param nav - The Navigation object with the graph of navigable nodes.
 * @param origin - The start node.
 * @param goal - The destination node.
 */
export function path_find(world: World, origin: GridCell, goal: GridCell) {
    let predecessors: VectorField = [];

    // The cost from the origin for each visited node (G).
    let g: Array<number> = [];
    g[origin.Index] = 0;
    // The heuristic to the goal for each visited node (H).
    let h: Array<number> = [];
    h[origin.Index] = 0;
    // The total cost for each visited node (F).
    let f: Array<number> = [];
    f[origin.Index] = 0;

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

        // Check top, down, left and right neighbors in a single loop.
        for (let i = 0; i < 4; i++) {
            let offset = neighbor_offsets[i];
            let x = current.Position[0] + offset[0];
            let y = current.Position[1] + offset[1];
            let neighbor = world.Grid[y]?.[x];
            if (!neighbor || !neighbor.Walkable) {
                continue;
            }

            // The G cost of getting from the origin to `next` is the G cost of
            // the current node plus the cost of getting from the current node
            // to `next`.
            let g_next = g[current.Index] + 1 + neighbor.TrafficIntensity * TRAFFIC_FACTOR;
            if (g[neighbor.Index] === undefined) {
                // We've never visited this neighboring node before. Update the
                // G cost, compute the H cost, compute the F cost.
                h[neighbor.Index] = distance_squared(neighbor.Position, goal.Position);
                g[neighbor.Index] = g_next;
                f[neighbor.Index] = g_next + h[neighbor.Index];
                // Record that we've reached this neighbor from the current
                // node. This will be used to trace the entire path from the
                // goal back to the origin.
                predecessors[neighbor.Index] = current;
                // Add the neighbor to the queue.
                boundary.push(neighbor);
            } else if (g_next + EPSILON < g[neighbor.Index]) {
                // We visited this neighboring node before, but we arrived at it
                // via a detour. We now have a better path to it from the
                // origin, manifested by a better G cost. Recompute the F cost.
                g[neighbor.Index] = g_next;
                f[neighbor.Index] = g_next + h[neighbor.Index];
                // Record that we've reached this neighbor from the current
                // node, rather than the one recorded previously.
                predecessors[neighbor.Index] = current;
            }
        }
    }

    // No path from the origin to the goal could be found.
    return false;
}

// Linearly search for the index of the element of `boundary` with the lowest
// cost in `cost`.
function lowest_cost(boundary: Array<GridCell>, cost: Array<number>) {
    let min = 0;
    for (let i = 0; i < boundary.length; i++) {
        if (cost[boundary[i].Index] + EPSILON < cost[boundary[min].Index]) {
            min = i;
        }
    }
    return min;
}

// Follow the path from the goal back to the origin by tracing the predecessors
// recorded for each node of the graph.
function* path_follow(path: VectorField, goal: GridCell) {
    while (goal !== undefined) {
        yield goal;
        goal = path[goal.Index];
    }
}
