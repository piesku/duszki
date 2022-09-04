import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";

export const enum GridFlag {
    None = 0,
    Walkable = 1 << 0,
    Pleasant = 1 << 1,
}

export function grid(mask: GridFlag) {
    return (game: Game, entity: Entity) => {
        let transform = game.World.LocalTransform2D[entity];
        let x = Math.round(transform.Translation[0]);
        let y = Math.round(transform.Translation[1]);

        game.World.Grid[y][x] = {
            TileEntity: entity,
            Walkable: !!(mask & GridFlag.Walkable),
            Pleasant: !!(mask & GridFlag.Pleasant),
            Ocupados: [],
        };
    };
}
