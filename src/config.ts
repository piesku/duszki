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
        Name: "Cemetery",
        Description: "Where duszki can rest.",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 20,
        CostFactor: 1.4,
    },
    {
        Name: "Chapel",
        Description: "Where duszki can feed.",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 15,
        CostFactor: 1.5,
    },
    {
        Name: "Crypt",
        Description: "Where duszki can work.",
        BaseIncome: 0.2,
        IncomeFactor: 1.01,
        StartingCost: 40,
        CostFactor: 1.6,
    },
];
