import {float} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export const enum NeedType {
    WORK,
    FOOD,
    SLEEP,
}

export interface Needs {
    Value: Record<NeedType, number>;
    Delta: Record<NeedType, number>;
    Target: Record<NeedType, Entity | undefined>;
}

export function needs() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Needs;
        game.World.Needs[entity] = {
            Value: {
                [NeedType.FOOD]: 1,
                [NeedType.SLEEP]: 0.7,
                [NeedType.WORK]: 1,
            },
            Delta: {
                [NeedType.FOOD]: float() / 25,
                [NeedType.SLEEP]: float() / 25,
                [NeedType.WORK]: float() / 25,
            },
            Target: {
                [NeedType.FOOD]: undefined,
                [NeedType.SLEEP]: undefined,
                [NeedType.WORK]: undefined,
            },
        };
    };
}
