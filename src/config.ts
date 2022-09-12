export interface GeneratorConfig {
    Name: string;
    Description: string;
    BaseIncome: number;
    IncomeFactor: number;
    StartingCost: number;
    CostFactor: number;
}

export const enum GeneratorId {
    Sleep,
    Food,
    Work,
}

export const GENERATORS: Array<GeneratorConfig> = [
    {
        Name: "Resting Place",
        Description: "A place for your citizens to rest.",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 20,
        CostFactor: 1.4,
    },
    {
        Name: "Eating Place",
        Description: "Build to feed your citizens.",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 15,
        CostFactor: 1.5,
    },
    {
        Name: "Working Place",
        Description: "Generate wealth by working.",
        BaseIncome: 0.2,
        IncomeFactor: 1.01,
        StartingCost: 40,
        CostFactor: 1.6,
    },
];
