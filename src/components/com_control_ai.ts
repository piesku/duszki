import {element, float, integer} from "../../lib/random.js";
import {Entity} from "../../lib/world.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlAi {
    Name: string;
    Says: string;
}

export function control_ai() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlAi;
        game.World.ControlAi[entity] = {
            Name: random_name(integer(3, 8)) + " " + random_name(integer(3, 8)),
            Says: "Hello!",
        };
    };
}

const consonants = "bcdfghjklmnpqrstvwxyz";
const vowels = "aeiou";
function random_name(len: number) {
    let name = "";
    for (let i = 0; i < len; i++) {
        if (float() < 0.6) {
            name += element(consonants as unknown as Array<string>);
        } else {
            name += element(vowels as unknown as Array<string>);
        }
        if (i == 0) {
            name = name.toUpperCase();
        }
    }
    return name;
}
