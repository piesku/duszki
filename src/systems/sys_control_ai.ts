import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Walk;

export function sys_control_ai(game: Game, delta: number) {
    // let node_ids = [];
    // for (let i = 0; i < game.World.Navigation.Graph.length; i++) {
    //     if (game.World.Navigation.Graph[i]) {
    //         node_ids.push(i);
    //     }
    // }
    // for (let ent = 0; ent < game.World.Signature.length; ent++) {
    //     if ((game.World.Signature[ent] & QUERY) == QUERY) {
    //         let walk = game.World.Walk[ent];
    //         if (walk.DestinationNode === null && walk.Path.length === 0) {
    //             walk.DestinationNode = element(node_ids);
    //         }
    //     }
    // }
}
