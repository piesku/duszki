import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAi | Has.Render2D;

export function sys_highlight(game: Game, delta: number) {
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let render = game.World.Render2D[ent];
            if (ent === game.SelectedEntity) {
                render.Color[3] = 2;
            } else {
                render.Color[3] = 1;
            }
        }
    }

    if (game.SelectedEntity === null) {
        for (let y = 0; y < game.World.Grid.length; y++) {
            for (let x = 0; x < game.World.Grid[y].length; x++) {
                let cell = game.World.Grid[y][x];
                if (cell.Walkable && cell.TileEntity !== null) {
                    let render = game.World.Render2D[cell.TileEntity];
                    render.Color[3] = 1;
                }
            }
        }
    }
}
