import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";

export function sys_score(game: Game, delta: number) {
    game.World.Age += delta;

    // Compute the 60-second EMAs.
    let weight = Math.min(1, delta / 60);

    game.World.Population += (game.World.DuszkiAlive - game.World.Population) * weight;
    game.World.Mortality += (game.FrameStats.Deaths - game.World.Mortality) * weight;

    if (game.World.Population > 0) {
        let happy_percent = game.FrameStats[NeedType.HAPPY] / game.World.Population;
        game.World.Happiness += (happy_percent - game.World.Happiness) * weight;

        let food_percent = game.FrameStats[NeedType.FOOD] / game.World.Population;
        game.World.Nutrition += (food_percent - game.World.Nutrition) * weight;

        let sleep_percent = game.FrameStats[NeedType.SLEEP] / game.World.Population;
        game.World.Restedness += (sleep_percent - game.World.Restedness) * weight;
    } else {
        game.World.Happiness = 0;
        game.World.Nutrition = 0;
        game.World.Restedness = 0;
    }

    // Reset all frame stats.
    for (let stat_name in game.FrameStats) {
        game.FrameStats[stat_name] = 0;
    }
}
