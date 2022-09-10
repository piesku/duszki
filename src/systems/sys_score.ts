import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";

export function sys_score(game: Game, delta: number) {
    game.World.Age += delta;

    // Compute the 60-second EMAs.
    let weight = Math.min(1, delta / 60);

    game.World.Population += (game.World.DuszkiAlive - game.World.Population) * weight;
    game.World.Mortality += (game.FrameStats.Deaths - game.World.Mortality) * weight;

    if (game.World.Population > 0) {
        let out_of = Math.max(game.World.DuszkiAlive, game.World.Population);

        let happy_percent = game.FrameStats[NeedType.HAPPY] / out_of;
        game.World.Happiness += (happy_percent - game.World.Happiness) * weight;

        let food_percent = game.FrameStats[NeedType.FOOD] / out_of;
        game.World.Nutrition += (food_percent - game.World.Nutrition) * weight;

        let sleep_percent = game.FrameStats[NeedType.SLEEP] / out_of;
        game.World.Restedness += (sleep_percent - game.World.Restedness) * weight;

        let working_percent = game.World.DuszkiWorking / out_of;
        game.World.Employment += (working_percent - game.World.Employment) * weight;
    } else {
        game.World.Happiness = 0;
        game.World.Nutrition = 0;
        game.World.Restedness = 0;
    }
}
