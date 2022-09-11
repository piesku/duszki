export interface GeneratorConfig {
    Name: string;
    Description: string;
    BaseIncome: number;
    IncomeFactor: number;
    StartingCost: number;
    CostFactor: number;
    Multipliers: Array<[number, number]>;
}

export const enum GeneratorId {
    House,
    Farm,
    Mine1,
    Mine2,
    Mine3,
    Mine4,
    Mine5,
}

export const GENERATORS: Array<GeneratorConfig> = [
    {
        Name: "Resting Place",
        Description: "A place for your citizens to rest.",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 20,
        CostFactor: 1.4,
        Multipliers: [],
    },
    {
        Name: "Eating Place",
        Description: "Build to feed your citizens.",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 15,
        CostFactor: 1.5,
        Multipliers: [],
    },
    {
        Name: "Working Place",
        Description: "Generate wealth by working.",
        BaseIncome: 2,
        IncomeFactor: 1.01,
        StartingCost: 40,
        CostFactor: 1.6,
        Multipliers: [],
    },
];
