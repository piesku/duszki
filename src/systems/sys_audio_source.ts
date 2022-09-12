import {play_synth_clip} from "../../lib/audio.js";
import {Game} from "../game.js";
import {snd_wind} from "../sounds/snd_wind.js";

let time_playing = 0;
let track_duration = 10;

export function sys_audio_source(game: Game, delta: number) {
    time_playing += delta;
    if (time_playing > track_duration) {
        time_playing = 0;
        play_synth_clip(game.Audio, snd_wind);
    }
}
