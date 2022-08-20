import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";

export function grid() {
    return (game: Game, entity: Entity) => {
        let transform = game.World.LocalTransform2D[entity];
        let x = Math.round(transform.Translation[0]);
        let y = Math.round(transform.Translation[1]);

        game.World.Grid[y][x] = {
            entity,
            walkable: false,
        };
    };
}