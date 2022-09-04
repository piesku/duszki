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
    value: Record<NeedType, number>;
    delta: Record<NeedType, number>;
    targets: Record<NeedType, Entity | undefined>;
}

export function needs() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Needs;
        game.World.Needs[entity] = {
            value: {
                [NeedType.FOOD]: 1,
                [NeedType.SLEEP]: 0.7,
                [NeedType.WORK]: 1,
            },
            delta: {
                [NeedType.FOOD]: float() / 25,
                [NeedType.SLEEP]: float() / 25,
                [NeedType.WORK]: float() / 25,
            },
            targets: {
                [NeedType.FOOD]: undefined,
                [NeedType.SLEEP]: undefined,
                [NeedType.WORK]: undefined,
            },
        };
    };
}
