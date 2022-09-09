import {Game} from "../game.js";

export function sys_score(game: Game, delta: number) {
    game.World.Age += delta;

    // Compute the 10-second mortality EMA.
    game.World.Mortality += (game.FrameStats.Deaths - game.World.Mortality) / (10 / delta);
    game.FrameStats.Deaths = 0;

    // TODO Do something with Mortality, Happiness, etc.
}
