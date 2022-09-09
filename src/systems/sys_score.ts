import {Game} from "../game.js";

export function sys_score(game: Game, delta: number) {
    game.World.Age += delta;

    // TODO Do something with Mortality, Happiness, etc.
}
