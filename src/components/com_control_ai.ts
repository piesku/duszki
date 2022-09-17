import {element, float, integer} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlAi {
    Name: string;
    Says: string;
    DecisionInterval: number;
    TimeSinceDecision: number;
}

export function control_ai() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlAi;
        game.World.ControlAi[entity] = {
            Name: random_name(integer(2, 4)) + " " + random_name(integer(2, 4)),
            Says: "Hello!",
            DecisionInterval: float(0.5, 1.5),
            TimeSinceDecision: 0,
        };
    };
}

const consonants = "bcdfghjklmnpqrstyz";
const vowels = "aeeaiou";
const postfix = ["ski", "witz", "sky", "yde", "os"];
function random_name(len: number) {
    let name = "";
    for (let i = 0; i < len; i++) {
        if (float() < 0.4) {
            name += element(consonants as unknown as Array<string>);
        } else {
            name += element(vowels as unknown as Array<string>);
        }
        if (i == 0) {
            name = name.toUpperCase();
        }
    }
    name += element(postfix as unknown as Array<string>);

    return name;
}
