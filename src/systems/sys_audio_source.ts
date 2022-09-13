import {Instrument, play_note} from "../../lib/audio.js";
import {Game} from "../game.js";
import {music1} from "../sounds/music1.js";

let music = music1;
let prev_time = 0;
let curr_time = 0;
let note_index = 0;
let instrument: Instrument = [
    2,
    false,
    8,
    0,
    [
        ["triangle", 8, 2, 2, 4, 8, false],
        ["sine", 4, 3, 3, 5, 9, false],
    ],
];

export function sys_audio_source(game: Game, delta: number) {
    prev_time = curr_time;
    curr_time += delta;

    while (note_index < music.length) {
        let [time, note, duration] = music[note_index];
        if (time > curr_time) {
            return;
        }

        play_note(game.Audio, instrument, note, time - prev_time, duration);
        note_index++;
    }

    note_index = 0;
    curr_time = 0;
}
