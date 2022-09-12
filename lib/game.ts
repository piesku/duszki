import {create_entity, Entity, WorldImpl} from "./world.js";

const update_span = document.getElementById("update");
const delta_span = document.getElementById("delta");
const fps_span = document.getElementById("fps");
const step = 1 / 60;

/**
 * The base Game class.
 *
 * This class is the base class for all games. It runs the main loop and
 * registers event listeners for input handling.
 */
export abstract class GameImpl {
    Running = 0;
    Now = 0;

    abstract World: WorldImpl;

    ViewportWidth = window.innerWidth;
    ViewportHeight = window.innerHeight;
    ViewportResized = true;

    // State of input during this frame.
    // 1 = down, 0 = up, or any number for analog inputs.
    InputState: Record<string, number> = {
        MouseX: 0,
        MouseY: 0,
    };
    // Changes of InputState that happened right before this frame.
    // 1 = pressed, -1 = released, 0 = no change.
    InputDelta: Record<string, number> = {
        MouseX: 0,
        MouseY: 0,
    };
    // Pixels traveled while mouse/touch was down.
    InputDistance: Record<string, number> = {
        Mouse: 0,
        Mouse0: 0,
        Mouse1: 0,
        Mouse2: 0,
    };

    Ui = document.querySelector("main")!;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? this.Stop() : this.Start()
        );

        this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());

        this.Ui.addEventListener("mousedown", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 1;
            this.InputDelta[`Mouse${evt.button}`] = 1;
        });
        this.Ui.addEventListener("mouseup", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 0;
            this.InputDelta[`Mouse${evt.button}`] = -1;
        });
        this.Ui.addEventListener("mousemove", (evt) => {
            this.InputState["MouseX"] = evt.clientX;
            this.InputState["MouseY"] = evt.clientY;
            this.InputDelta["MouseX"] = evt.movementX;
            this.InputDelta["MouseY"] = evt.movementY;
        });
        this.Ui.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            this.InputDelta["WheelY"] = evt.deltaY;
        });
    }

    Start() {
        let last = performance.now();

        let tick = (now: number) => {
            let delta = (now - last) / 1000;
            last = now;

            this.Running = requestAnimationFrame(tick);
            this.FrameSetup(delta);
            this.FrameUpdate(delta);
            this.FrameReset(delta);
        };

        this.Stop();
        requestAnimationFrame(tick);
    }

    Stop() {
        cancelAnimationFrame(this.Running);
        this.Running = 0;
    }

    FrameSetup(delta: number) {
        this.Now = performance.now();

        let mouse_distance =
            Math.abs(this.InputDelta["MouseX"]) + Math.abs(this.InputDelta["MouseY"]);
        this.InputDistance["Mouse"] += mouse_distance;

        if (this.InputState["Mouse0"] === 1) {
            this.InputDistance["Mouse0"] += mouse_distance;
        }
        if (this.InputState["Mouse1"] === 1) {
            this.InputDistance["Mouse1"] += mouse_distance;
        }
        if (this.InputState["Mouse2"] === 1) {
            this.InputDistance["Mouse2"] += mouse_distance;
        }
    }

    FixedUpdate(step: number) {}
    FrameUpdate(delta: number) {}

    FrameReset(delta: number) {
        this.ViewportResized = false;

        if (this.InputDelta["Mouse0"] === -1) {
            this.InputDistance["Mouse0"] = 0;
        }
        if (this.InputDelta["Mouse1"] === -1) {
            this.InputDistance["Mouse1"] = 0;
        }
        if (this.InputDelta["Mouse2"] === -1) {
            this.InputDistance["Mouse2"] = 0;
        }

        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }

        let update = performance.now() - this.Now;
        if (update_span) {
            update_span.textContent = update.toFixed(1);
        }
        if (delta_span) {
            delta_span.textContent = (delta * 1000).toFixed(1);
        }
        if (fps_span) {
            fps_span.textContent = (1 / delta).toFixed();
        }
    }
}

/**
 * The base Game class for 3D games.
 *
 * Stores references to the canvas elements and the WebGL2 context, as well as
 * Context2D instances for drawing behind and in front of the scene.
 */
export abstract class Game3D extends GameImpl {
    SceneCanvas = document.querySelector("#s")! as HTMLCanvasElement;
    Gl = this.SceneCanvas.getContext("webgl2", {antialias: false})!;

    Audio = new AudioContext();
    Cameras: Array<Entity> = [];
}

type Mixin<G extends GameImpl> = (game: G, entity: Entity) => void;
export type Blueprint<G extends GameImpl> = Array<Mixin<G>>;

export function instantiate<G extends GameImpl>(game: G, blueprint: Blueprint<G>) {
    let entity = create_entity(game.World);
    for (let mixin of blueprint) {
        mixin(game, entity);
    }
    return entity;
}
