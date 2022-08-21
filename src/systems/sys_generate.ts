import {ERAS, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {Has} from "../world.js";

const QUERY = Has.Generator;

export function sys_generate(game: Game, delta: number) {
    // First, tally up the number of each kind of generator.
    game.GeneratorCounts = new Array(GENERATORS.length).fill(0);

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let gen = game.World.Generator[ent];
            game.GeneratorCounts[gen.Id] += 1;
        }
    }

    let era = ERAS[game.CurrentEra];
    game.IncomePerSecond = 0;

    // Then, generate income.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let entity_generator = game.World.Generator[ent];
            let gen_id = entity_generator.Id;

            let gen_count = game.GeneratorCounts[gen_id];
            let gen_config = GENERATORS[gen_id];
            let gen_income = income(era, gen_config, gen_count);

            game.TotalWealth += gen_income * delta;
            game.IncomePerSecond += gen_income;
        }
    }
}