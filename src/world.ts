import {Vec2} from "../lib/math.js";
import {Entity, WorldImpl} from "../lib/world.js";
import {AnimateSprite} from "./components/com_animate_sprite.js";
import {Camera2D} from "./components/com_camera2d.js";
import {Children} from "./components/com_children.js";
import {Collide2D} from "./components/com_collide2d.js";
import {ControlAi} from "./components/com_control_ai.js";
import {ControlAlways2D} from "./components/com_control_always2d.js";
import {ControlPlayer} from "./components/com_control_player.js";
import {Draw} from "./components/com_draw.js";
import {Generator} from "./components/com_generator.js";
import {Lifespan} from "./components/com_lifespan.js";
import {LocalTransform2D} from "./components/com_local_transform2d.js";
import {Move2D} from "./components/com_move2d.js";
import {Named} from "./components/com_named.js";
import {Needs} from "./components/com_needs.js";
import {Render2D} from "./components/com_render2d.js";
import {RigidBody2D} from "./components/com_rigid_body2d.js";
import {Shake} from "./components/com_shake.js";
import {SpatialNode2D} from "./components/com_spatial_node2d.js";
import {Spawn} from "./components/com_spawn.js";
import {Task} from "./components/com_task.js";
import {Toggle} from "./components/com_toggle.js";
import {Trigger} from "./components/com_trigger.js";
import {Walk} from "./components/com_walk.js";

const enum Component {
    AnimateSprite,
    Camera2D,
    Collide2D,
    ControlAi,
    ControlAlways2D,
    ControlPlayer,
    Children,
    Dirty,
    Draw,
    Generator,
    Lifespan,
    LocalTransform2D,
    Move2D,
    Named,
    Needs,
    Render2D,
    RigidBody2D,
    Shake,
    SpatialNode2D,
    Spawn,
    Task,
    Toggle,
    Trigger,
    Walk,
}

export const enum Has {
    None = 0,
    AnimateSprite = 1 << Component.AnimateSprite,
    Camera2D = 1 << Component.Camera2D,
    Collide2D = 1 << Component.Collide2D,
    ControlAi = 1 << Component.ControlAi,
    ControlAlways2D = 1 << Component.ControlAlways2D,
    ControlPlayer = 1 << Component.ControlPlayer,
    Children = 1 << Component.Children,
    Dirty = 1 << Component.Dirty,
    Draw = 1 << Component.Draw,
    Generator = 1 << Component.Generator,
    Lifespan = 1 << Component.Lifespan,
    LocalTransform2D = 1 << Component.LocalTransform2D,
    Move2D = 1 << Component.Move2D,
    Named = 1 << Component.Named,
    Needs = 1 << Component.Needs,
    Render2D = 1 << Component.Render2D,
    RigidBody2D = 1 << Component.RigidBody2D,
    Shake = 1 << Component.Shake,
    SpatialNode2D = 1 << Component.SpatialNode2D,
    Spawn = 1 << Component.Spawn,
    Task = 1 << Component.Task,
    Toggle = 1 << Component.Toggle,
    Trigger = 1 << Component.Trigger,
    Walk = 1 << Component.Walk,
}

export interface GridCell {
    entity: Entity | null;
    walkable: boolean;
}

export class World extends WorldImpl {
    Width: number = 120;
    Height: number = 80;
    Grid: GridCell[][] = Array(this.Height)
        .fill(0)
        .map(() =>
            Array(this.Width)
                .fill(0)
                .map(() => ({entity: null, walkable: false}))
        );

    AnimateSprite: Array<AnimateSprite> = [];
    Camera2D: Array<Camera2D> = [];
    Collide2D: Array<Collide2D> = [];
    ControlAi: Array<ControlAi> = [];
    ControlAlways2D: Array<ControlAlways2D> = [];
    ControlPlayer: Array<ControlPlayer> = [];
    Children: Array<Children> = [];
    Draw: Array<Draw> = [];
    Generator: Array<Generator> = [];
    Lifespan: Array<Lifespan> = [];
    LocalTransform2D: Array<LocalTransform2D> = [];
    Move2D: Array<Move2D> = [];
    Named: Array<Named> = [];
    Needs: Array<Needs> = [];
    Render2D: Array<Render2D> = [];
    RigidBody2D: Array<RigidBody2D> = [];
    Shake: Array<Shake> = [];
    SpatialNode2D: Array<SpatialNode2D> = [];
    Spawn: Array<Spawn> = [];
    Task: Array<Task> = [];
    Toggle: Array<Toggle> = [];
    Trigger: Array<Trigger> = [];
    Walk: Array<Walk> = [];
}

export function node_to_position(world: World, node: number): Vec2 {
    return [node % world.Width, Math.floor(node / world.Width)];
}

export function position_to_node(world: World, position: Vec2) {
    return position[1] * world.Width + position[0];
}
