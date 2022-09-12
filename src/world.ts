import {Vec2} from "../lib/math.js";
import {Entity, WorldImpl} from "../lib/world.js";
import {FLOATS_PER_INSTANCE} from "../materials/layout2d.js";
import {Camera2D} from "./components/com_camera2d.js";
import {Children} from "./components/com_children.js";
import {ControlAi} from "./components/com_control_ai.js";
import {ControlPlayer} from "./components/com_control_player.js";
import {Follow} from "./components/com_follow.js";
import {Generator} from "./components/com_generator.js";
import {Lifespan} from "./components/com_lifespan.js";
import {LocalTransform2D} from "./components/com_local_transform2d.js";
import {Move2D} from "./components/com_move2d.js";
import {Named} from "./components/com_named.js";
import {Needs} from "./components/com_needs.js";
import {Render2D} from "./components/com_render2d.js";
import {Satisfy} from "./components/com_satisfy.js";
import {SpatialNode2D} from "./components/com_spatial_node2d.js";
import {Walk} from "./components/com_walk.js";

const enum Component {
    Alive,
    Camera2D,
    Collide2D,
    ControlAi,
    ControlPlayer,
    Children,
    Dirty,
    Generator,
    Follow,
    Lifespan,
    LocalTransform2D,
    Move2D,
    Named,
    Needs,
    Render2D,
    Satisfy,
    SpatialNode2D,
    Walk,
}

export const enum Has {
    None = 0,
    Alive = 1 << Component.Alive,
    Camera2D = 1 << Component.Camera2D,
    Collide2D = 1 << Component.Collide2D,
    ControlAi = 1 << Component.ControlAi,
    ControlPlayer = 1 << Component.ControlPlayer,
    Children = 1 << Component.Children,
    Dirty = 1 << Component.Dirty,
    Generator = 1 << Component.Generator,
    Follow = 1 << Component.Follow,
    Lifespan = 1 << Component.Lifespan,
    LocalTransform2D = 1 << Component.LocalTransform2D,
    Move2D = 1 << Component.Move2D,
    Named = 1 << Component.Named,
    Needs = 1 << Component.Needs,
    Render2D = 1 << Component.Render2D,
    Satisfy = 1 << Component.Satisfy,
    SpatialNode2D = 1 << Component.SpatialNode2D,
    Walk = 1 << Component.Walk,
}

export const enum GridType {
    Other,
    Road,
    Tree,
}
export interface GridCell {
    Index: number;
    Position: Vec2;
    TileEntity: Entity | null;
    Walkable: boolean;
    Pleasant: boolean;
    Ocupados: Entity[];
    TrafficIntensity: number;
    Type: GridType;
    TimesWalked: number;
    Updated: boolean;
}

export class World extends WorldImpl {
    id = 0;

    // Persistent game state.
    TotalWealth = 100;
    Age = 0;
    Milestone = 0;
    Population = 0;
    Immigration = 0;
    Mortality = 0;
    Happiness = 0;
    Nutrition = 0;
    Restedness = 0;
    Employment = 0;
    DuszkiAlive = 0;
    DuszkiWorking = 0;

    // Grid of the world.
    Width: number = 100;
    Height: number = 100;
    Grid: GridCell[][] = Array(this.Height)
        .fill(0)
        .map((_, y) =>
            Array(this.Width)
                .fill(0)
                .map(
                    (_, x): GridCell => ({
                        Index: x + y * this.Width,
                        Position: [x, y],
                        TileEntity: null,
                        Walkable: false,
                        Pleasant: false,
                        Ocupados: [],
                        TrafficIntensity: 0,
                        Type: GridType.Other,
                        TimesWalked: 0,
                        Updated: false,
                    })
                )
        );

    // Raw LocalTransform2D or SpatialNode2D data, and Render2D data, uploaded to the GPU.
    InstanceData = new Float32Array(this.Capacity * FLOATS_PER_INSTANCE);

    // Component data.
    Camera2D: Array<Camera2D> = [];
    ControlAi: Array<ControlAi> = [];
    ControlPlayer: Array<ControlPlayer> = [];
    Children: Array<Children> = [];
    Generator: Array<Generator> = [];
    Follow: Array<Follow> = [];
    Lifespan: Array<Lifespan> = [];
    LocalTransform2D: Array<LocalTransform2D> = [];
    Move2D: Array<Move2D> = [];
    Named: Array<Named> = [];
    Needs: Array<Needs> = [];
    Render2D: Array<Render2D> = [];
    Satisfy: Array<Satisfy> = [];
    SpatialNode2D: Array<SpatialNode2D> = [];
    Walk: Array<Walk> = [];
}
