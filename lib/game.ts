import {RenderTarget} from "./framebuffer.js";
import {GL_CULL_FACE, GL_DEPTH_TEST, GL_ONE_MINUS_SRC_ALPHA, GL_SRC_ALPHA} from "./webgl.js";
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
        let accumulator = 0;
        let last = performance.now();

        let tick = (now: number) => {
            let delta = (now - last) / 1000;
            last = now;

            this.Running = requestAnimationFrame(tick);

            this.FrameSetup(delta);
            accumulator += delta;
            while (accumulator >= step) {
                accumulator -= step;
                // TODO Adjust InputDelta and InputDistance.
                this.FixedUpdate(step);
            }
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
    BackgroundCanvas = document.querySelector("#background")! as HTMLCanvasElement;
    BackgroundContext = this.BackgroundCanvas.getContext("2d")!;

    ForegroundCanvas = document.querySelector("#foreground")! as HTMLCanvasElement;
    ForegroundContext = this.ForegroundCanvas.getContext("2d")!;

    SceneCanvas = document.querySelector("#scene")! as HTMLCanvasElement;
    Gl = this.SceneCanvas.getContext("webgl2", {antialias: false})!;

    Audio = new AudioContext();
    Cameras: Array<Entity> = [];
    Targets: Record<string, RenderTarget> = {};
}

/**
 * Base Game class for XR games.
 *
 * XR games use the WebXR API's `requestAnimationFrame` to run the game loop.
 */
export abstract class GameXR extends Game3D {
    XrSupported = false;
    XrSession?: XRSession;
    XrSpace?: XRReferenceSpace;
    // XrFrame can be used to check whether we're presenting to a VR display.
    XrFrame?: XRFrame;
    XrInputs: Record<string, XRInputSource> = {};

    constructor() {
        super();

        this.Gl.enable(GL_DEPTH_TEST);
        this.Gl.enable(GL_CULL_FACE);

        this.Gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

        if (navigator.xr) {
            xr_init(this);
        }
    }

    override Start() {
        let accumulator = 0;
        let last = performance.now();

        let tick = (now: number, frame?: XRFrame) => {
            let delta = (now - last) / 1000;
            last = now;

            if (frame) {
                this.XrFrame = frame;
                this.Running = this.XrFrame.session.requestAnimationFrame(tick);
            } else {
                this.XrFrame = undefined;
                this.Running = requestAnimationFrame(tick);
            }

            this.FrameSetup(delta);
            accumulator += delta;
            while (accumulator >= step) {
                accumulator -= step;
                // TODO Adjust InputDelta and InputDistance.
                this.FixedUpdate(step);
            }
            this.FrameUpdate(delta);
            this.FrameReset(delta);
        };

        if (this.XrSession) {
            this.Running = this.XrSession.requestAnimationFrame(tick);
        } else {
            this.Running = requestAnimationFrame(tick);
        }
    }

    override Stop() {
        if (this.XrSession) {
            this.XrSession.cancelAnimationFrame(this.Running);
        } else {
            cancelAnimationFrame(this.Running);
        }
        this.Running = 0;
    }

    async EnterXR() {
        let session = await navigator.xr.requestSession("immersive-vr");
        session.updateRenderState({
            baseLayer: new XRWebGLLayer(session, this.Gl),
        });
        this.XrSpace = await session.requestReferenceSpace("local");

        this.Stop();
        this.XrSession = session;
        this.Start();

        this.XrSession.addEventListener("end", () => {
            this.Stop();
            this.XrSession = undefined;
            this.XrSpace = undefined;
            this.XrFrame = undefined;
            this.ViewportResized = true;
            this.Start();
        });
    }

    override FrameSetup(delta: number) {
        super.FrameSetup(delta);

        if (this.XrFrame) {
            this.XrInputs = {};
            for (let input of this.XrFrame.session.inputSources) {
                if (input.gripSpace) {
                    this.XrInputs[input.handedness] = input;
                }
            }
        }
    }
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

// Implemented as a free function so that we can use async/await.
async function xr_init(game: GameXR) {
    await game.Gl.makeXRCompatible();
    game.XrSupported = await navigator.xr.isSessionSupported("immersive-vr");
}
