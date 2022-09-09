import {Game3D} from "../lib/game.js";
import {Vec2} from "../lib/math.js";
import {create_spritesheet_from} from "../lib/texture.js";
import {GL_BLEND, GL_DEPTH_TEST, GL_ONE_MINUS_SRC_ALPHA, GL_SRC_ALPHA} from "../lib/webgl.js";
import {Entity} from "../lib/world.js";
import {setup_render2d_buffers} from "../materials/layout2d.js";
import {mat_render2d} from "../materials/mat_render2d.js";
import {sys_build_buildings} from "./systems/sys_build_buildings.js";
import {sys_build_erase} from "./systems/sys_build_erase.js";
import {sys_build_roads} from "./systems/sys_build_roads.js";
import {sys_build_trees} from "./systems/sys_build_trees.js";
import {sys_camera2d} from "./systems/sys_camera2d.js";
import {sys_collide2d} from "./systems/sys_collide2d.js";
import {sys_control_ai} from "./systems/sys_control_ai.js";
import {sys_control_always2d} from "./systems/sys_control_always2d.js";
import {sys_control_camera_follow} from "./systems/sys_control_camera_follow.js";
import {sys_control_camera_main} from "./systems/sys_control_camera_main.js";
import {sys_control_mouse} from "./systems/sys_control_mouse.js";
import {sys_draw2d} from "./systems/sys_draw2d.js";
import {sys_follow} from "./systems/sys_follow2d.js";
import {sys_generate} from "./systems/sys_generate.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_move2d} from "./systems/sys_move2d.js";
import {sys_needs} from "./systems/sys_needs.js";
import {sys_poll} from "./systems/sys_poll.js";
import {sys_render2d} from "./systems/sys_render2d.js";
import {sys_render2d_animate} from "./systems/sys_render2d_animate.js";
import {sys_resize2d} from "./systems/sys_resize2d.js";
import {sys_satisfy} from "./systems/sys_satisfy.js";
import {sys_save} from "./systems/sys_save.js";
import {sys_shake2d} from "./systems/sys_shake2d.js";
import {sys_spawn2d} from "./systems/sys_spawn2d.js";
import {sys_toggle} from "./systems/sys_toggle.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {sys_trigger2d} from "./systems/sys_trigger2d.js";
import {sys_ui} from "./systems/sys_ui.js";
import {sys_walk} from "./systems/sys_walk.js";
import {Has, World} from "./world.js";

export const WORLD_CAPACITY = 65_536; // = 4MB of InstanceData.

export class Game extends Game3D {
    Store: IDBDatabase;
    World = new World(WORLD_CAPACITY);

    MinimapCanvas = document.querySelector("canvas#minimap") as HTMLCanvasElement;
    MinimapContext = this.MinimapCanvas.getContext("2d")!;

    FollowCanvas = document.querySelector("canvas#follow") as HTMLCanvasElement;
    FollowContext = this.FollowCanvas.getContext("2d")!;

    Spritesheet = create_spritesheet_from(this.Gl, document.querySelector("img")!);
    MaterialRender2D = mat_render2d(this.Gl, Has.Render2D, Has.SpatialNode2D);
    InstanceBuffer = this.Gl.createBuffer()!;

    UnitSize = 16;
    PointerPosition: Vec2 = [0, 0];
    ActiveBuilding: null | number = null;
    SelectedEntity: null | Entity = null;

    GeneratorCounts: Array<number> = [];
    IncomePerSecond = 0;

    constructor(db: IDBDatabase) {
        super();

        this.Store = db;

        this.MinimapCanvas.width = this.World.Width;
        this.MinimapCanvas.height = this.World.Height;

        this.Gl.enable(GL_DEPTH_TEST);
        this.Gl.enable(GL_BLEND);
        this.Gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        setup_render2d_buffers(this.Gl, this.InstanceBuffer);
    }

    override FrameUpdate(delta: number) {
        // Event loop.
        sys_poll(this, delta);

        // Player input.
        sys_control_camera_main(this, delta);
        sys_control_camera_follow(this, delta);
        sys_control_mouse(this, delta);
        sys_build_buildings(this, delta);
        sys_build_roads(this, delta);
        sys_build_trees(this, delta);
        sys_build_erase(this, delta);

        // AI.
        sys_needs(this, delta);
        sys_control_ai(this, delta);
        sys_control_always2d(this, delta);
        sys_satisfy(this, delta);

        // Game logic.
        sys_generate(this, delta);
        sys_walk(this, delta);
        sys_move2d(this, delta);
        sys_follow(this, delta);
        sys_lifespan(this, delta);
        sys_shake2d(this, delta);
        sys_toggle(this, delta);
        sys_spawn2d(this, delta);

        // Commit all positions.
        sys_transform2d(this, delta);

        // Collisions.
        sys_collide2d(this, delta);
        sys_trigger2d(this, delta);

        // Camera.
        sys_resize2d(this, delta);
        sys_camera2d(this, delta);

        // Save the game periodically.
        sys_save(this, delta);

        // Rendering.
        sys_draw2d(this, delta);
        sys_render2d_animate(this, delta);
        sys_render2d(this, delta);
        sys_ui(this, delta);
    }
}

export const enum Layer {
    None = 0,
    Terrain = 1,
    Object = 2,
}
