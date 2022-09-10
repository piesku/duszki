import {Action, dispatch} from "../actions.js";
import {NeedType} from "../components/com_needs.js";
import {Game} from "../game.js";

let spawn_timeout = 5;
let time_since_last_spawn = spawn_timeout;

// Some initial duszkis should move into town just
// because there's place to sleep and eat
let initial_population = 3;
export function sys_populate(game: Game, delta: number) {
    time_since_last_spawn -= delta;

    game.PopulationSituation = "";

    let total_duszki = Math.max(game.World.DuszkiAlive, game.World.Population);

    if (time_since_last_spawn > 0) {
        return;
    }

    let enough_beds = game.FrameStats.Beds > total_duszki;
    let enough_food = game.FrameStats.RestaurantSeats > total_duszki;
    let enough_work = game.FrameStats.Workplaces > total_duszki;
    let low_mortality = game.World.Mortality < 0.3;
    let high_happiness = game.FrameStats[NeedType.HAPPY] / total_duszki > 0.7;

    if (
        total_duszki < initial_population &&
        game.FrameStats.Beds > 0 &&
        game.FrameStats.Workplaces > 0 &&
        game.FrameStats.RestaurantSeats > 0
    ) {
        time_since_last_spawn = spawn_timeout;
        dispatch(game, Action.SpawnDuszek, {});
    } else if (enough_beds && enough_food && enough_work && low_mortality && high_happiness) {
        time_since_last_spawn = spawn_timeout;
        dispatch(game, Action.SpawnDuszek, {});
    } else {
        if (!enough_beds) {
            game.PopulationSituation =
                "The housing situation is terrible, duszki have nowhere to sleep!";
        } else if (!enough_food) {
            game.PopulationSituation =
                "There is not enough restaurants, duszki have nowhere to eat!";
        } else if (!enough_work) {
            game.PopulationSituation =
                "There is not enough workplaces, duszki have nowhere to work!";
        } else if (!low_mortality) {
            game.PopulationSituation =
                "The mortality rate is too high, duszki are dying on the streets!";
        } else if (!high_happiness) {
            game.PopulationSituation = "Duszki are unhappy, build some parks!";
        }
    }
}
