import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {GridType} from "../world.js";

export const enum GridFlag {
    None = 0,
    Walkable = 1 << 0,
    Pleasant = 1 << 1,
}

export function grid(mask: GridFlag, kind: GridType) {
    return (game: Game, entity: Entity) => {
        let local = game.World.LocalTransform2D[entity];
        let x = Math.round(local.Translation[0]);
        let y = Math.round(local.Translation[1]);
        let cell = game.World.Grid[y]?.[x];
        if (cell) {
            cell.TileEntity = entity;
            cell.Walkable = (mask & GridFlag.Walkable) != 0;
            cell.Pleasant = (mask & GridFlag.Pleasant) != 0;
            cell.Type = kind;
        }
    };
}
