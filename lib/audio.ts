export interface AudioSynthClip {
    /** Audio tracks making up this clip. */
    Tracks: Array<AudioTrack>;
}

export interface AudioTrack {
    Instrument: Instrument;
    Notes: Array<number>;
}

export interface Instrument {
    [InstrumentParam.MasterGainAmount]: number;
    [InstrumentParam.FilterType]?: false | BiquadFilterType;
    [InstrumentParam.FilterFreq]?: number;
    [InstrumentParam.FilterQ]?: number;
    [InstrumentParam.Sources]: Array<Oscillator | Buffer>;
}

interface Oscillator {
    [SourceParam.SourceType]: OscillatorType;
    [SourceParam.GainAmount]: number;
    [SourceParam.GainAttack]: number;
    [SourceParam.GainSustain]: number;
    [SourceParam.GainRelease]: number;
    [SourceParam.DetuneAmount]: number;
    [SourceParam.DetuneLFO]?: boolean;
}

interface Buffer {
    [SourceParam.SourceType]: false;
    [SourceParam.GainAmount]: number;
    [SourceParam.GainAttack]: number;
    [SourceParam.GainSustain]: number;
    [SourceParam.GainRelease]: number;
}

export const enum InstrumentParam {
    MasterGainAmount,
    FilterType,
    FilterFreq,
    FilterQ,
    Sources,
}

export const enum SourceParam {
    SourceType,
    GainAmount,
    GainAttack,
    GainSustain,
    GainRelease,
    DetuneAmount,
    DetuneLFO,
}

export function play_note(
    audio: AudioContext,
    instr: Instrument,
    note: number,
    offset: number,
    duration: number
) {
    let time = audio.currentTime + offset;
    let total_duration = 0;

    let master = audio.createGain();
    master.gain.value = (instr[InstrumentParam.MasterGainAmount] / 9) ** 3;

    if (instr[InstrumentParam.FilterType]) {
        let filter = audio.createBiquadFilter();
        filter.type = instr[InstrumentParam.FilterType] as BiquadFilterType;
        filter.frequency.value = 2 ** instr[InstrumentParam.FilterFreq]!;
        filter.Q.value = instr[InstrumentParam.FilterQ]! ** 1.5;

        master.connect(filter);
        filter.connect(audio.destination);
    } else {
        master.connect(audio.destination);
    }

    for (let source of instr[InstrumentParam.Sources]) {
        let amp = audio.createGain();
        amp.connect(master);

        // Gain Envelope

        let gain_amount = (source[SourceParam.GainAmount] / 9) ** 3;
        let gain_attack = (source[SourceParam.GainAttack] / 9) ** 3;
        //let gain_sustain = (source[SourceParam.GainSustain] / 9) ** 3;
        let gain_sustain = duration;
        let gain_release = (source[SourceParam.GainRelease] / 6) ** 3;
        let gain_duration = gain_attack + gain_sustain + gain_release;

        amp.gain.setValueAtTime(0, time);
        amp.gain.linearRampToValueAtTime(gain_amount, time + gain_attack);
        amp.gain.setValueAtTime(gain_amount, time + gain_attack + gain_sustain);
        amp.gain.exponentialRampToValueAtTime(0.00001, time + gain_duration);

        // XXX TypeScript doesn't recognize source[SourceParam.SourceType] as the discriminant.
        if (source[0]) {
            let hfo = audio.createOscillator();
            hfo.type = source[SourceParam.SourceType];
            hfo.connect(amp);

            // Detune

            // [-1265,1265] i.e. one octave down and one octave up.
            hfo.detune.value = 3 * (source[SourceParam.DetuneAmount] - 7.5) ** 3;

            // Frequency Envelope

            // Frequency from note number
            let freq = 440 * 2 ** ((note - 69) / 12);
            hfo.frequency.setValueAtTime(freq, time);

            hfo.start(time);
            hfo.stop(time + gain_duration);
        }

        if (gain_duration > total_duration) {
            total_duration = gain_duration;
        }
    }
}
