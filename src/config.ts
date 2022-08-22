export interface GeneratorConfig {
    Name: string;
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
        Name: "🛖 Domek",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 5,
        CostFactor: 1,
        Multipliers: [],
    },
    {
        Name: "🍕 Jadłodajnia",
        BaseIncome: 0,
        IncomeFactor: 1,
        StartingCost: 5,
        CostFactor: 1,
        Multipliers: [],
    },
    {
        Name: "🌤️ Sundial",
        BaseIncome: 3,
        IncomeFactor: 1.1,
        StartingCost: 40,
        CostFactor: 1.12,
        Multipliers: [
            [10, 2],
            [25, 2],
            [50, 3],
            [75, 4],
            [100, 5],
            [150, 5],
            [200, 5],
            [250, 5],
            [500, 5],
        ],
    },
    {
        Name: "⏳ Hourglass",
        BaseIncome: 53,
        IncomeFactor: 1.2,
        StartingCost: 1500,
        CostFactor: 1.15,
        Multipliers: [
            [10, 4],
            [25, 2],
            [50, 3],
            [75, 4],
            [100, 5],
            [150, 5],
            [200, 5],
            [250, 5],
            [500, 5],
        ],
    },
    {
        Name: "🕰️ Pendulum",
        BaseIncome: 887,
        IncomeFactor: 1.1,
        StartingCost: 44350,
        CostFactor: 1.11,
        Multipliers: [
            [10, 1.5],
            [25, 2],
            [50, 2.5],
            [75, 3],
            [100, 3.5],
            [150, 4],
            [200, 4.5],
            [250, 5],
            [500, 5.5],
        ],
    },
    {
        Name: "⌚ Quartz",
        BaseIncome: 3539,
        IncomeFactor: 1.3,
        StartingCost: 707800,
        CostFactor: 1.14,
        Multipliers: [
            [10, 2.1],
            [25, 2.2],
            [50, 2.3],
            [75, 2.4],
            [100, 2.5],
            [150, 2.6],
            [200, 2.7],
            [250, 2.8],
            [500, 2.9],
        ],
    },
    {
        Name: "🤖 Atomic",
        BaseIncome: 21371,
        IncomeFactor: 1.5,
        StartingCost: 10685500,
        CostFactor: 1.13,
        Multipliers: [
            [10, 1.1],
            [25, 1.2],
            [50, 1.3],
            [75, 1.4],
            [100, 1.5],
            [150, 1.6],
            [200, 1.7],
            [250, 1.8],
            [500, 1.9],
        ],
    },
];

export interface EraConfig {
    Id: number;
    Name: string;
    TpsRequired: number;
    Multiplier: number;
}

export const ERAS: Array<EraConfig> = [
    {
        Id: 0,
        Name: "Ancient Era",
        TpsRequired: 0,
        Multiplier: 1,
    },
    {
        Id: 1,
        Name: "Classical Era",
        TpsRequired: 100000,
        Multiplier: 2,
    },
    {
        Id: 2,
        Name: "Middle Ages",
        TpsRequired: 1000000,
        Multiplier: 4,
    },
    {
        Id: 3,
        Name: "Renaissance",
        TpsRequired: 10000000,
        Multiplier: 8,
    },
    {
        Id: 4,
        Name: "Industrial Era",
        TpsRequired: 100000000,
        Multiplier: 16,
    },
    {
        Id: 5,
        Name: "Information Era",
        TpsRequired: 1000000000,
        Multiplier: 32,
    },
];
