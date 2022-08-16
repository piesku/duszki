import {Vec2} from "../../lib/math.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface Navigable {
    NodeId: number;
    Edges: Array<Edge>;
    WorldPosition: Vec2;
}

export type Edge = [destination: number, cost: number];

export function navigable(node_id: number, edges: Array<Edge>, world_position: Vec2) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Navigable;
        game.World.Navigable[entity] = {
            NodeId: node_id,
            Edges: edges,
            WorldPosition: world_position,
        };
        game.World.NodeToEntity[node_id] = entity;
    };
}
