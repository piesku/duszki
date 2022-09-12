import {GeneratorConfig} from "./config.js";

export function total_cost(gen: GeneratorConfig, own_count: number) {
    return gen.StartingCost * gen.CostFactor ** own_count;
}

export function income(gen: GeneratorConfig, count: number) {
    return gen.BaseIncome * count ** gen.IncomeFactor;
}
