import {query_down} from "../components/com_children.js";
import {ERAS, GENERATORS} from "../config.js";
import {Game} from "../game.js";
import {income} from "../generator.js";
import {Has} from "../world.js";

const QUERY = Has.Generator;

export function sys_generate(game: Game, delta: number) {
    // First, tally up the number of each kind of generator.
    game.GeneratorCounts = new Array(GENERATORS.length).fill(0);
    game.GeneratorOccupancy = new Array(GENERATORS.length).fill(0);

    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            let gen = game.World.Generator[ent];
            game.GeneratorCounts[gen.Id]++;
            for (let child_entity of query_down(game.World, ent, Has.Satisfy)) {
                let satisfy = game.World.Satisfy[child_entity];
                game.GeneratorOccupancy[gen.Id] += satisfy.Ocupados.length;
            }
        }
    }

    let era = ERAS[game.World.CurrentEra];
    game.IncomePerSecond = 0;

    // Then, generate income.
    for (let ent = 0; ent < game.World.Signature.length; ent++) {
        if ((game.World.Signature[ent] & QUERY) == QUERY) {
            for (let child_entity of query_down(game.World, ent, Has.Satisfy)) {
                let satisfy = game.World.Satisfy[child_entity];
                if (satisfy.Ocupados.length > 0) {
                    let entity_generator = game.World.Generator[ent];
                    let gen_id = entity_generator.Id;

                    let gen_count = game.GeneratorOccupancy[gen_id];
                    let gen_config = GENERATORS[gen_id];
                    let gen_income = income(era, gen_config, gen_count);

                    game.IncomePerSecond += gen_income;
                    game.World.TotalWealth += gen_income * delta;
                }
                break;
            }
        }
    }
}
