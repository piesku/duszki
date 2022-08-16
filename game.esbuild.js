(() => {
  // ../src/actions.ts
  function dispatch(game2, action, payload) {
    switch (action) {
      case 0 /* NoOp */: {
        break;
      }
    }
  }

  // ../lib/webgl.ts
  var GL_DEPTH_BUFFER_BIT = 256;
  var GL_COLOR_BUFFER_BIT = 16384;
  var GL_TRIANGLE_STRIP = 5;
  var GL_SRC_ALPHA = 770;
  var GL_ONE_MINUS_SRC_ALPHA = 771;
  var GL_STATIC_DRAW = 35044;
  var GL_STREAM_DRAW = 35040;
  var GL_ARRAY_BUFFER = 34962;
  var GL_BLEND = 3042;
  var GL_DEPTH_TEST = 2929;
  var GL_RGBA = 6408;
  var GL_PIXEL_UNSIGNED_BYTE = 5121;
  var GL_FRAGMENT_SHADER = 35632;
  var GL_VERTEX_SHADER = 35633;
  var GL_NEAREST = 9728;
  var GL_TEXTURE_MAG_FILTER = 10240;
  var GL_TEXTURE_MIN_FILTER = 10241;
  var GL_TEXTURE_WRAP_S = 10242;
  var GL_TEXTURE_WRAP_T = 10243;
  var GL_TEXTURE_2D = 3553;
  var GL_TEXTURE0 = 33984;
  var GL_REPEAT = 10497;
  var GL_FRAMEBUFFER = 36160;
  var GL_FLOAT = 5126;

  // ../lib/game.ts
  var update_span = document.getElementById("update");
  var delta_span = document.getElementById("delta");
  var fps_span = document.getElementById("fps");
  var step = 1 / 60;
  var GameImpl = class {
    constructor() {
      this.Running = 0;
      this.Now = 0;
      this.ViewportWidth = window.innerWidth;
      this.ViewportHeight = window.innerHeight;
      this.ViewportResized = true;
      this.InputState = {
        MouseX: 0,
        MouseY: 0
      };
      this.InputDelta = {
        MouseX: 0,
        MouseY: 0
      };
      this.InputDistance = {
        Mouse: 0,
        Mouse0: 0,
        Mouse1: 0,
        Mouse2: 0,
        Touch0: 0,
        Touch1: 0
      };
      this.InputTouches = {};
      this.Ui = document.querySelector("main");
      document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
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
      this.Ui.addEventListener("touchstart", (evt) => {
        if (evt.target === this.Ui) {
          evt.preventDefault();
        }
        if (evt.touches.length === 1) {
          this.InputTouches = {};
        }
        for (let i = 0; i < evt.touches.length; i++) {
          let touch = evt.touches[i];
          this.InputTouches[touch.identifier] = i;
        }
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputState[`Touch${index}`] = 1;
          this.InputState[`Touch${index}X`] = touch.clientX;
          this.InputState[`Touch${index}Y`] = touch.clientY;
          this.InputDelta[`Touch${index}`] = 1;
          this.InputDelta[`Touch${index}X`] = 0;
          this.InputDelta[`Touch${index}Y`] = 0;
        }
      });
      this.Ui.addEventListener("touchmove", (evt) => {
        if (evt.target === this.Ui) {
          evt.preventDefault();
        }
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputDelta[`Touch${index}X`] = touch.clientX - this.InputState[`Touch${index}X`];
          this.InputDelta[`Touch${index}Y`] = touch.clientY - this.InputState[`Touch${index}Y`];
          this.InputState[`Touch${index}X`] = touch.clientX;
          this.InputState[`Touch${index}Y`] = touch.clientY;
        }
      });
      this.Ui.addEventListener("touchend", (evt) => {
        if (evt.target === this.Ui) {
          evt.preventDefault();
        }
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputState[`Touch${index}`] = 0;
          this.InputDelta[`Touch${index}`] = -1;
        }
      });
      this.Ui.addEventListener("touchcancel", (evt) => {
        for (let i = 0; i < evt.changedTouches.length; i++) {
          let touch = evt.changedTouches[i];
          let index = this.InputTouches[touch.identifier];
          this.InputState[`Touch${index}`] = 0;
          this.InputDelta[`Touch${index}`] = -1;
        }
      });
      window.addEventListener("keydown", (evt) => {
        if (!evt.repeat) {
          this.InputState[evt.code] = 1;
          this.InputDelta[evt.code] = 1;
        }
      });
      window.addEventListener("keyup", (evt) => {
        this.InputState[evt.code] = 0;
        this.InputDelta[evt.code] = -1;
      });
    }
    Start() {
      let accumulator = 0;
      let last = performance.now();
      let tick = (now) => {
        let delta = (now - last) / 1e3;
        last = now;
        this.Running = requestAnimationFrame(tick);
        this.FrameSetup(delta);
        accumulator += delta;
        while (accumulator >= step) {
          accumulator -= step;
          this.FixedUpdate(step);
        }
        this.FrameUpdate(delta);
        this.FrameReset(delta);
      };
      this.Stop();
      tick(last);
    }
    Stop() {
      cancelAnimationFrame(this.Running);
      this.Running = 0;
    }
    FrameSetup(delta) {
      this.Now = performance.now();
      let mouse_distance = Math.abs(this.InputDelta["MouseX"]) + Math.abs(this.InputDelta["MouseY"]);
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
      if (this.InputState["Touch0"] === 1) {
        this.InputDistance["Touch0"] += Math.abs(this.InputDelta["Touch0X"]) + Math.abs(this.InputDelta["Touch0Y"]);
      }
      if (this.InputState["Touch1"] === 1) {
        this.InputDistance["Touch1"] += Math.abs(this.InputDelta["Touch1X"]) + Math.abs(this.InputDelta["Touch1Y"]);
      }
    }
    FixedUpdate(step2) {
    }
    FrameUpdate(delta) {
    }
    FrameReset(delta) {
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
      if (this.InputDelta["Touch0"] === -1) {
        this.InputDistance["Touch0"] = 0;
      }
      if (this.InputDelta["Touch1"] === -1) {
        this.InputDistance["Touch1"] = 0;
      }
      for (let name in this.InputDelta) {
        this.InputDelta[name] = 0;
      }
      let update14 = performance.now() - this.Now;
      if (update_span) {
        update_span.textContent = update14.toFixed(1);
      }
      if (delta_span) {
        delta_span.textContent = (delta * 1e3).toFixed(1);
      }
      if (fps_span) {
        fps_span.textContent = (1 / delta).toFixed();
      }
    }
  };
  var Game3D = class extends GameImpl {
    constructor() {
      super(...arguments);
      this.BackgroundCanvas = document.querySelector("#background");
      this.BackgroundContext = this.BackgroundCanvas.getContext("2d");
      this.ForegroundCanvas = document.querySelector("#foreground");
      this.ForegroundContext = this.ForegroundCanvas.getContext("2d");
      this.SceneCanvas = document.querySelector("#scene");
      this.Gl = this.SceneCanvas.getContext("webgl2");
      this.Audio = new AudioContext();
      this.Cameras = [];
      this.Targets = {};
    }
  };
  function instantiate(game2, blueprint) {
    let entity = game2.World.CreateEntity();
    for (let mixin of blueprint) {
      mixin(game2, entity);
    }
    return entity;
  }

  // ../lib/texture.ts
  function create_spritesheet_from(gl, image) {
    let texture = gl.createTexture();
    gl.bindTexture(GL_TEXTURE_2D, texture);
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, GL_RGBA, GL_PIXEL_UNSIGNED_BYTE, image);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    return {
      Texture: texture,
      Width: image.width,
      Height: image.height
    };
  }

  // ../materials/layout2d.ts
  var FLOATS_PER_INSTANCE = 16;
  var BYTES_PER_INSTANCE = FLOATS_PER_INSTANCE * 4;
  function setup_render2d_buffers(gl, instance_buffer) {
    let vertex_arr = Float32Array.from([
      -0.51,
      -0.51,
      0,
      1,
      0.51,
      -0.51,
      1,
      1,
      -0.51,
      0.51,
      0,
      0,
      0.51,
      0.51,
      1,
      0
    ]);
    gl.bindBuffer(GL_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(GL_ARRAY_BUFFER, vertex_arr, GL_STATIC_DRAW);
    gl.enableVertexAttribArray(0 /* VertexPosition */);
    gl.vertexAttribPointer(0 /* VertexPosition */, 2, GL_FLOAT, false, 4 * 4, 0);
    gl.enableVertexAttribArray(1 /* VertexTexCoord */);
    gl.vertexAttribPointer(1 /* VertexTexCoord */, 2, GL_FLOAT, false, 4 * 4, 4 * 2);
    gl.bindBuffer(GL_ARRAY_BUFFER, instance_buffer);
    gl.enableVertexAttribArray(2 /* InstanceRotation */);
    gl.vertexAttribDivisor(2 /* InstanceRotation */, 1);
    gl.vertexAttribPointer(2 /* InstanceRotation */, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 0);
    gl.enableVertexAttribArray(3 /* InstanceTranslation */);
    gl.vertexAttribDivisor(3 /* InstanceTranslation */, 1);
    gl.vertexAttribPointer(3 /* InstanceTranslation */, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 4);
    gl.enableVertexAttribArray(4 /* InstanceColor */);
    gl.vertexAttribDivisor(4 /* InstanceColor */, 1);
    gl.vertexAttribPointer(4 /* InstanceColor */, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 8);
    gl.enableVertexAttribArray(5 /* InstanceSprite */);
    gl.vertexAttribDivisor(5 /* InstanceSprite */, 1);
    gl.vertexAttribPointer(5 /* InstanceSprite */, 4, GL_FLOAT, false, BYTES_PER_INSTANCE, 4 * 12);
  }

  // ../lib/material.ts
  function link(gl, vertex2, fragment2) {
    let program = gl.createProgram();
    gl.attachShader(program, compile(gl, GL_VERTEX_SHADER, vertex2));
    gl.attachShader(program, compile(gl, GL_FRAGMENT_SHADER, fragment2));
    gl.linkProgram(program);
    if (false) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    return program;
  }
  function compile(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (false) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  // ../materials/mat_render2d.ts
  function vertex(has_render2d, has_spatial_node2d) {
    return `#version 300 es

    uniform mat3x2 pv;
    uniform vec2 sheet_size;

    // Vertex attributes
    layout(location=${0 /* VertexPosition */}) in vec2 attr_position;
    layout(location=${1 /* VertexTexCoord */}) in vec2 attr_texcoord;

    // Instance attributes
    layout(location=${2 /* InstanceRotation */}) in vec4 attr_rotation; // [a, b, c, d]
    layout(location=${3 /* InstanceTranslation */}) in vec4 attr_translation; // [x, y, z, w: Signature]
    layout(location=${4 /* InstanceColor */}) in vec4 attr_color;
    layout(location=${5 /* InstanceSprite */}) in vec4 attr_sprite;

    out vec2 vert_texcoord;
    out vec4 vert_color;
    out vec4 vert_sprite;

    void main() {
        int signature = int(attr_translation.w);
        if ((signature & ${has_render2d}) == ${has_render2d}) {
            mat3x2 world;
            if ((signature & ${has_spatial_node2d}) == ${has_spatial_node2d}) {
                world = mat3x2(
                    attr_rotation.xy,
                    attr_rotation.zw,
                    attr_translation.xy
                );
            } else {
                vec2 scale = attr_rotation.xy;
                float rotation = attr_rotation.z;
                world = mat3x2(
                    cos(rotation) * scale.x, sin(rotation) * scale.x,
                    -sin(rotation) * scale.y, cos(rotation) * scale.y,
                    attr_translation.xy
                );
            }

            vec3 world_position = mat3(world) * vec3(attr_position, 1);
            vec3 clip_position = mat3(pv) * world_position;
            gl_Position = vec4(clip_position.xy, -attr_translation.z, 1);

            // attr_texcoords are +Y=down for compatibility with spritesheet frame coordinates.
            vert_texcoord = (attr_sprite.xy + attr_sprite.zw * attr_texcoord) / sheet_size;
            vert_color = attr_color;
        } else {
            // Place the vertex outside the frustum.
            gl_Position.z = 2.0;
        }
    }`;
  }
  var fragment = `#version 300 es

    precision mediump float;

    uniform sampler2D sheet_texture;

    in vec2 vert_texcoord;
    in vec4 vert_color;

    out vec4 frag_color;

    void main() {
        frag_color = vert_color * texture(sheet_texture, vert_texcoord);
        if (frag_color.a == 0.0) {
            discard;
        }
    }
`;
  function mat_render2d(gl, has_render2d, has_spatial_node2d) {
    let program = link(gl, vertex(has_render2d, has_spatial_node2d), fragment);
    return {
      Mode: GL_TRIANGLE_STRIP,
      Program: program,
      Locations: {
        Pv: gl.getUniformLocation(program, "pv"),
        World: gl.getUniformLocation(program, "world"),
        SheetTexture: gl.getUniformLocation(program, "sheet_texture"),
        SheetSize: gl.getUniformLocation(program, "sheet_size")
      }
    };
  }

  // ../lib/mat2d.ts
  function create() {
    return [1, 0, 0, 1, 0, 0];
  }
  function set(out, a2, b, c, d, tx, ty) {
    out[0] = a2;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  function copy(out, a2) {
    set(out, a2[0], a2[1], a2[2], a2[3], a2[4], a2[5]);
    return out;
  }
  function invert(out, a2) {
    let aa = a2[0], ab = a2[1], ac = a2[2], ad = a2[3];
    let atx = a2[4], aty = a2[5];
    let det = aa * ad - ab * ac;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
  }
  function multiply(out, a2, b) {
    let a0 = a2[0], a1 = a2[1], a22 = a2[2], a3 = a2[3], a4 = a2[4], a5 = a2[5];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a22 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a22 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a22 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }
  function compose(out, v, r, s) {
    let sin = Math.sin(r);
    let cos = Math.cos(r);
    out[0] = cos * s[0];
    out[1] = sin * s[0];
    out[2] = -sin * s[1];
    out[3] = cos * s[1];
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }
  function get_translation(out, a2) {
    out[0] = a2[4];
    out[1] = a2[5];
    return out;
  }
  function from_ortho(out, left, top) {
    set(out, left, 0, 0, top, 0, 0);
    return out;
  }

  // ../lib/world.ts
  var WorldImpl = class {
    constructor(capacity = 1e4) {
      this.Signature = [];
      this.Graveyard = [];
      this.Capacity = capacity;
    }
    CreateEntity() {
      if (this.Graveyard.length > 0) {
        return this.Graveyard.pop();
      }
      if (false) {
        throw new Error("No more entities available.");
      }
      return this.Signature.push(0) - 1;
    }
    DestroyEntity(entity) {
      this.Signature[entity] = 0;
      if (false) {
        throw new Error("Entity already in graveyard.");
      }
      this.Graveyard.push(entity);
    }
  };

  // ../src/world.ts
  var World = class extends WorldImpl {
    constructor() {
      super(...arguments);
      this.Width = 32;
      this.Height = 20;
      this.Navigation = { Graph: [], Centroids: [] };
      this.AnimateSprite = [];
      this.Camera2D = [];
      this.Collide2D = [];
      this.ControlAi = [];
      this.ControlAlways2D = [];
      this.ControlPlayer = [];
      this.Children = [];
      this.Draw = [];
      this.Lifespan = [];
      this.LocalTransform2D = [];
      this.Move2D = [];
      this.Named = [];
      this.Render2D = [];
      this.RigidBody2D = [];
      this.Shake = [];
      this.SpatialNode2D = [];
      this.Spawn = [];
      this.Task = [];
      this.Toggle = [];
      this.Trigger = [];
      this.Walk = [];
    }
  };
  function node_to_position(world, node) {
    return [node % world.Width, world.Height - Math.floor(node / world.Width) - 1];
  }

  // ../src/systems/sys_camera2d.ts
  var QUERY = 65536 /* SpatialNode2D */ | 2 /* Camera2D */;
  function sys_camera2d(game2, delta) {
    game2.Cameras = [];
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY) === QUERY) {
        let camera = game2.World.Camera2D[ent];
        let camera_node = game2.World.SpatialNode2D[ent];
        multiply(camera.Pv, camera.Projection.Projection, camera_node.Self);
        copy(camera.World, camera_node.World);
        game2.Cameras.push(ent);
      }
    }
  }

  // ../lib/aabb2d.ts
  function compute_aabb_without_rotation_scale(world, aabb) {
    get_translation(aabb.Center, world);
    aabb.Min[0] = aabb.Center[0] - aabb.Size[0] / 2;
    aabb.Min[1] = aabb.Center[1] - aabb.Size[1] / 2;
    aabb.Max[0] = aabb.Center[0] + aabb.Size[0] / 2;
    aabb.Max[1] = aabb.Center[1] + aabb.Size[1] / 2;
  }
  function intersect_aabb(a2, b) {
    return a2.Min[0] < b.Max[0] && a2.Max[0] > b.Min[0] && a2.Min[1] < b.Max[1] && a2.Max[1] > b.Min[1];
  }
  function penetrate_aabb(a2, b) {
    let distance_x = a2.Center[0] - b.Center[0];
    let penetration_x = a2.Size[0] / 2 + b.Size[0] / 2 - Math.abs(distance_x);
    let distance_y = a2.Center[1] - b.Center[1];
    let penetration_y = a2.Size[1] / 2 + b.Size[1] / 2 - Math.abs(distance_y);
    if (penetration_x < penetration_y) {
      return [penetration_x * Math.sign(distance_x), 0];
    } else {
      return [0, penetration_y * Math.sign(distance_y)];
    }
  }

  // ../src/systems/sys_collide2d.ts
  var QUERY2 = 65536 /* SpatialNode2D */ | 4 /* Collide2D */;
  function sys_collide2d(game2, delta) {
    let static_colliders = [];
    let dynamic_colliders = [];
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY2) === QUERY2) {
        let node = game2.World.SpatialNode2D[i];
        let collider = game2.World.Collide2D[i];
        collider.Collisions = [];
        if (collider.New) {
          collider.New = false;
          compute_aabb_without_rotation_scale(node.World, collider);
        } else if (collider.Dynamic) {
          compute_aabb_without_rotation_scale(node.World, collider);
          dynamic_colliders.push(collider);
        } else {
          static_colliders.push(collider);
        }
      }
    }
    for (let i = 0; i < dynamic_colliders.length; i++) {
      check_collisions(dynamic_colliders[i], static_colliders, static_colliders.length);
      check_collisions(dynamic_colliders[i], dynamic_colliders, i);
    }
  }
  function check_collisions(collider, colliders, length2) {
    for (let i = 0; i < length2; i++) {
      let other = colliders[i];
      let collider_can_intersect = collider.Mask & other.Layers;
      let other_can_intersect = other.Mask & collider.Layers;
      if (collider_can_intersect || other_can_intersect) {
        if (intersect_aabb(collider, other)) {
          let hit = penetrate_aabb(collider, other);
          if (collider_can_intersect) {
            collider.Collisions.push({
              Other: other.EntityId,
              Hit: hit
            });
          }
          if (other_can_intersect) {
            other.Collisions.push({
              Other: collider.EntityId,
              Hit: [-hit[0], -hit[1]]
            });
          }
        }
      }
    }
  }

  // ../lib/random.ts
  var seed = 1;
  function rand() {
    seed = seed * 16807 % 2147483647;
    return (seed - 1) / 2147483646;
  }
  function integer(min = 0, max = 1) {
    return ~~(rand() * (max - min + 1) + min);
  }
  function float(min = 0, max = 1) {
    return rand() * (max - min) + min;
  }
  function element(arr) {
    return arr[integer(0, arr.length - 1)];
  }

  // ../src/systems/sys_control_ai.ts
  var QUERY3 = 8 /* ControlAi */ | 2097152 /* Walk */;
  function sys_control_ai(game2, delta) {
    let node_ids = game2.World.Navigation.Graph.map((_, i) => i).filter((i) => i !== void 0);
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY3) == QUERY3) {
        let walk2 = game2.World.Walk[ent];
        if (walk2.DestinationNode === null && walk2.Path.length === 0) {
          walk2.DestinationNode = element(node_ids);
        }
      }
    }
  }

  // ../src/systems/sys_control_always2d.ts
  var QUERY4 = 16 /* ControlAlways2D */ | 2048 /* Move2D */;
  function sys_control_always2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY4) === QUERY4) {
        update(game2, i);
      }
    }
  }
  function update(game2, entity) {
    let control = game2.World.ControlAlways2D[entity];
    let move = game2.World.Move2D[entity];
    if (control.Direction) {
      move.Direction[0] = control.Direction[0];
      move.Direction[1] = control.Direction[1];
      game2.World.Signature[entity] |= 128 /* Dirty */;
    }
    if (control.Rotation) {
      move.Rotation = control.Rotation;
      game2.World.Signature[entity] |= 128 /* Dirty */;
    }
  }

  // ../src/systems/sys_control_keyboard.ts
  var QUERY5 = 32 /* ControlPlayer */ | 2048 /* Move2D */ | 16384 /* RigidBody2D */;
  function sys_control_keyboard(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY5) == QUERY5) {
        update2(game2, ent);
      }
    }
  }
  function update2(game2, entity) {
    let move = game2.World.Move2D[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    if (game2.InputState["ArrowLeft"]) {
      move.Direction[0] -= 1;
      game2.World.Signature[entity] |= 128 /* Dirty */;
    }
    if (game2.InputState["ArrowRight"]) {
      move.Direction[0] += 1;
      game2.World.Signature[entity] |= 128 /* Dirty */;
    }
    if (game2.InputState["ArrowUp"] && rigid_body.IsGrounded) {
      rigid_body.Acceleration[1] = 500;
    }
  }

  // ../lib/input.ts
  function pointer_down(game2, mouse_button, touch_id = mouse_button) {
    return game2.InputState["Mouse" + mouse_button] > 0 || game2.InputState["Touch" + touch_id] > 0;
  }
  function pointer_viewport(game2, out) {
    if (game2.InputState["Touch0"] === 1 || game2.InputDelta["Touch0"] === -1) {
      out[0] = game2.InputState["Touch0X"];
      out[1] = game2.InputState["Touch0Y"];
      return true;
    }
    if (game2.InputDistance["Mouse"] > 0) {
      out[0] = game2.InputState["MouseX"];
      out[1] = game2.InputState["MouseY"];
      return true;
    }
    return false;
  }

  // ../lib/vec2.ts
  function set2(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  function copy2(out, a2) {
    out[0] = a2[0];
    out[1] = a2[1];
    return out;
  }
  function add(out, a2, b) {
    out[0] = a2[0] + b[0];
    out[1] = a2[1] + b[1];
    return out;
  }
  function subtract(out, a2, b) {
    out[0] = a2[0] - b[0];
    out[1] = a2[1] - b[1];
    return out;
  }
  function scale(out, a2, b) {
    out[0] = a2[0] * b;
    out[1] = a2[1] * b;
    return out;
  }
  function normalize(out, a2) {
    let x = a2[0];
    let y = a2[1];
    let len = x * x + y * y;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = a2[0] * len;
    out[1] = a2[1] * len;
    return out;
  }
  function rotate(out, a2, r) {
    let c = Math.cos(r);
    let s = Math.sin(r);
    out[0] = c * a2[0] - s * a2[1];
    out[1] = s * a2[0] + c * a2[1];
    return out;
  }
  function dot(a2, b) {
    return a2[0] * b[0] + a2[1] * b[1];
  }
  function transform_position(out, a2, m) {
    let x = a2[0];
    let y = a2[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
  function transform_direction(out, a2, m) {
    let x = a2[0];
    let y = a2[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }
  function length(a2) {
    return Math.hypot(a2[0], a2[1]);
  }
  function distance_squared(a2, b) {
    let x = b[0] - a2[0];
    let y = b[1] - a2[1];
    return x * x + y * y;
  }

  // ../src/components/com_camera2d.ts
  function camera2d(radius) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 2 /* Camera2D */;
      game2.World.Camera2D[entity] = {
        Projection: {
          Radius: radius,
          Projection: [1 / radius[0], 0, 0, 1 / radius[1], 0, 0],
          Inverse: [radius[0], 0, 0, radius[1], 0, 0]
        },
        Pv: create(),
        World: create(),
        ViewportWidth: 0,
        ViewportHeight: 0
      };
    };
  }
  function viewport_to_world(out, camera, pos) {
    out[0] = pos[0] / camera.ViewportWidth * 2 - 1;
    out[1] = -(pos[1] / camera.ViewportHeight) * 2 + 1;
    transform_position(out, out, camera.Projection.Inverse);
    transform_position(out, out, camera.World);
  }

  // ../src/components/com_local_transform2d.ts
  function local_transform2d(translation = [0, 0], rotation = 0, scale2 = [1, 1]) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 1024 /* LocalTransform2D */ | 128 /* Dirty */;
      game2.World.LocalTransform2D[entity] = {
        Translation: translation,
        Rotation: rotation,
        Scale: scale2
      };
    };
  }
  function set_position(x, y) {
    return (game2, entity) => {
      let local = game2.World.LocalTransform2D[entity];
      local.Translation[0] = x;
      local.Translation[1] = y;
    };
  }
  function copy_position(translation) {
    return (game2, entity) => {
      let local = game2.World.LocalTransform2D[entity];
      copy2(local.Translation, translation);
    };
  }

  // ../src/components/com_collide2d.ts
  function collide2d(dynamic, layers, mask, size = [1, 1]) {
    return (game2, EntityId) => {
      game2.World.Signature[EntityId] |= 4 /* Collide2D */;
      game2.World.Collide2D[EntityId] = {
        EntityId,
        New: true,
        Dynamic: dynamic,
        Layers: layers,
        Mask: mask,
        Size: size,
        Min: [0, 0],
        Max: [0, 0],
        Center: [0, 0],
        Collisions: []
      };
    };
  }

  // ../src/components/com_lifespan.ts
  function lifespan(remaining, action) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 512 /* Lifespan */;
      game2.World.Lifespan[entity] = {
        Remaining: remaining,
        Action: action
      };
    };
  }

  // ../lib/number.ts
  function clamp(min, max, num) {
    return Math.max(min, Math.min(max, num));
  }

  // ../sprites/spritesheet.ts
  var spritesheet = {
    "000.png": {
      "x": 0,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "001.png": {
      "x": 17,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "002.png": {
      "x": 0,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "003.png": {
      "x": 17,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "004.png": {
      "x": 34,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "005.png": {
      "x": 34,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "006.png": {
      "x": 0,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "007.png": {
      "x": 17,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "008.png": {
      "x": 34,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "009.png": {
      "x": 51,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "010.png": {
      "x": 51,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "011.png": {
      "x": 51,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "012.png": {
      "x": 0,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "013.png": {
      "x": 17,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "014.png": {
      "x": 34,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "015.png": {
      "x": 51,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "016.png": {
      "x": 68,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "017.png": {
      "x": 68,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "018.png": {
      "x": 68,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "019.png": {
      "x": 68,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "020.png": {
      "x": 0,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "021.png": {
      "x": 17,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "022.png": {
      "x": 34,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "023.png": {
      "x": 51,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "024.png": {
      "x": 68,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "025.png": {
      "x": 85,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "026.png": {
      "x": 85,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "027.png": {
      "x": 85,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "028.png": {
      "x": 85,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "029.png": {
      "x": 85,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "030.png": {
      "x": 0,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "031.png": {
      "x": 17,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "032.png": {
      "x": 34,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "033.png": {
      "x": 51,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "034.png": {
      "x": 68,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "035.png": {
      "x": 85,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "036.png": {
      "x": 102,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "037.png": {
      "x": 102,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "038.png": {
      "x": 102,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "039.png": {
      "x": 102,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "040.png": {
      "x": 102,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "041.png": {
      "x": 102,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "042.png": {
      "x": 0,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "043.png": {
      "x": 17,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "044.png": {
      "x": 34,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "045.png": {
      "x": 51,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "046.png": {
      "x": 68,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "047.png": {
      "x": 85,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "048.png": {
      "x": 102,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "049.png": {
      "x": 119,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "050.png": {
      "x": 119,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "051.png": {
      "x": 119,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "052.png": {
      "x": 119,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "053.png": {
      "x": 119,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "054.png": {
      "x": 119,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "055.png": {
      "x": 119,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "056.png": {
      "x": 0,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "057.png": {
      "x": 17,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "058.png": {
      "x": 34,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "059.png": {
      "x": 51,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "060.png": {
      "x": 68,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "061.png": {
      "x": 85,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "062.png": {
      "x": 102,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "063.png": {
      "x": 119,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "064.png": {
      "x": 136,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "065.png": {
      "x": 136,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "066.png": {
      "x": 136,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "067.png": {
      "x": 136,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "068.png": {
      "x": 136,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "069.png": {
      "x": 136,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "070.png": {
      "x": 136,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "071.png": {
      "x": 136,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "072.png": {
      "x": 0,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "073.png": {
      "x": 17,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "074.png": {
      "x": 34,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "075.png": {
      "x": 51,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "076.png": {
      "x": 68,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "077.png": {
      "x": 85,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "078.png": {
      "x": 102,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "079.png": {
      "x": 119,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "080.png": {
      "x": 136,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "081.png": {
      "x": 153,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "082.png": {
      "x": 153,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "083.png": {
      "x": 153,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "084.png": {
      "x": 153,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "085.png": {
      "x": 153,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "086.png": {
      "x": 153,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "087.png": {
      "x": 153,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "088.png": {
      "x": 153,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "089.png": {
      "x": 153,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "090.png": {
      "x": 0,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "091.png": {
      "x": 17,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "092.png": {
      "x": 34,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "093.png": {
      "x": 51,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "094.png": {
      "x": 68,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "095.png": {
      "x": 85,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "096.png": {
      "x": 102,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "097.png": {
      "x": 119,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "098.png": {
      "x": 136,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "099.png": {
      "x": 153,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "100.png": {
      "x": 170,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "101.png": {
      "x": 170,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "102.png": {
      "x": 170,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "103.png": {
      "x": 170,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "104.png": {
      "x": 170,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "105.png": {
      "x": 170,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "106.png": {
      "x": 170,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "107.png": {
      "x": 170,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "108.png": {
      "x": 170,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "109.png": {
      "x": 170,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "110.png": {
      "x": 0,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "111.png": {
      "x": 17,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "112.png": {
      "x": 34,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "113.png": {
      "x": 51,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "114.png": {
      "x": 68,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "115.png": {
      "x": 85,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "116.png": {
      "x": 102,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "117.png": {
      "x": 119,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "118.png": {
      "x": 136,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "119.png": {
      "x": 153,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "120.png": {
      "x": 170,
      "y": 170,
      "width": 16,
      "height": 16
    },
    "121.png": {
      "x": 187,
      "y": 0,
      "width": 16,
      "height": 16
    },
    "122.png": {
      "x": 187,
      "y": 17,
      "width": 16,
      "height": 16
    },
    "123.png": {
      "x": 187,
      "y": 34,
      "width": 16,
      "height": 16
    },
    "124.png": {
      "x": 187,
      "y": 51,
      "width": 16,
      "height": 16
    },
    "125.png": {
      "x": 187,
      "y": 68,
      "width": 16,
      "height": 16
    },
    "126.png": {
      "x": 187,
      "y": 85,
      "width": 16,
      "height": 16
    },
    "127.png": {
      "x": 187,
      "y": 102,
      "width": 16,
      "height": 16
    },
    "128.png": {
      "x": 187,
      "y": 119,
      "width": 16,
      "height": 16
    },
    "129.png": {
      "x": 187,
      "y": 136,
      "width": 16,
      "height": 16
    },
    "130.png": {
      "x": 187,
      "y": 153,
      "width": 16,
      "height": 16
    },
    "131.png": {
      "x": 187,
      "y": 170,
      "width": 16,
      "height": 16
    }
  };

  // ../src/components/com_render2d.ts
  function render2d(sprite_name, color = [1, 1, 1, 1]) {
    return (game2, entity) => {
      let instance_offset = entity * FLOATS_PER_INSTANCE;
      game2.InstanceData[instance_offset + 6] = 0;
      game2.InstanceData[instance_offset + 7] = 8192 /* Render2D */;
      game2.InstanceData[instance_offset + 8] = color[0];
      game2.InstanceData[instance_offset + 9] = color[1];
      game2.InstanceData[instance_offset + 10] = color[2];
      game2.InstanceData[instance_offset + 11] = color[3];
      game2.InstanceData[instance_offset + 12] = spritesheet[sprite_name].x;
      game2.InstanceData[instance_offset + 13] = spritesheet[sprite_name].y;
      game2.InstanceData[instance_offset + 14] = spritesheet[sprite_name].width;
      game2.InstanceData[instance_offset + 15] = spritesheet[sprite_name].height;
      game2.World.Signature[entity] |= 8192 /* Render2D */;
      game2.World.Render2D[entity] = {
        Detail: game2.InstanceData.subarray(instance_offset + 6, instance_offset + 8),
        Color: game2.InstanceData.subarray(instance_offset + 8, instance_offset + 12),
        Sprite: game2.InstanceData.subarray(instance_offset + 12, instance_offset + 16)
      };
    };
  }
  function order(z) {
    return (game2, entity) => {
      let instance_offset = entity * FLOATS_PER_INSTANCE;
      game2.InstanceData[instance_offset + 6] = clamp(-1, 1, z);
    };
  }
  function set_sprite(game2, entity, sprite_name) {
    let instance_offset = entity * FLOATS_PER_INSTANCE;
    game2.InstanceData[instance_offset + 12] = spritesheet[sprite_name].x;
    game2.InstanceData[instance_offset + 13] = spritesheet[sprite_name].y;
    game2.InstanceData[instance_offset + 14] = spritesheet[sprite_name].width;
    game2.InstanceData[instance_offset + 15] = spritesheet[sprite_name].height;
  }

  // ../src/components/com_rigid_body2d.ts
  function rigid_body2d(kind, bounciness = 1, friction = 1e-3) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 16384 /* RigidBody2D */;
      game2.World.RigidBody2D[entity] = {
        Kind: kind,
        Friction: friction,
        Bounciness: bounciness,
        Acceleration: [0, 0],
        VelocityLinear: [0, 0],
        VelocityResolved: [0, 0],
        VelocityAngular: 0,
        IsGrounded: false
      };
    };
  }

  // ../src/scenes/blu_square.ts
  var SQUARE_LIFESPAN = 10;
  function blueprint_square(game2) {
    return [
      local_transform2d(),
      collide2d(true, 2 /* Object */, 1 /* Terrain */ | 2 /* Object */),
      rigid_body2d(1 /* Dynamic */, 0.3),
      render2d("121.png"),
      order(0.9),
      lifespan(SQUARE_LIFESPAN)
    ];
  }

  // ../src/systems/sys_control_mouse.ts
  var QUERY6 = 32 /* ControlPlayer */ | 1024 /* LocalTransform2D */;
  var pointer_position = [0, 0];
  var SPAWN_INTERVAL = 0.1;
  var time_since_last_spawn = 0;
  function sys_control_mouse(game2, delta) {
    time_since_last_spawn += delta;
    if (!pointer_viewport(game2, pointer_position)) {
      return;
    }
    let camera_entity = game2.Cameras[0];
    if (camera_entity === void 0) {
      return;
    }
    let camera = game2.World.Camera2D[camera_entity];
    viewport_to_world(pointer_position, camera, pointer_position);
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY6) == QUERY6) {
        let local = game2.World.LocalTransform2D[ent];
        local.Translation[0] = Math.round(pointer_position[0]);
        local.Translation[1] = Math.round(pointer_position[1]);
        game2.World.Signature[ent] |= 128 /* Dirty */;
      }
    }
    if (time_since_last_spawn > SPAWN_INTERVAL) {
      if (pointer_down(game2, 0)) {
        instantiate(game2, [...blueprint_square(game2), copy_position(pointer_position)]);
        time_since_last_spawn = 0;
      }
    }
  }

  // ../src/systems/sys_draw2d.ts
  var QUERY7 = 65536 /* SpatialNode2D */ | 256 /* Draw */;
  function sys_draw2d(game2, delta) {
    let camera_entity = game2.Cameras[0];
    if (camera_entity === void 0) {
      return;
    }
    let camera = game2.World.Camera2D[camera_entity];
    let ctx = game2.BackgroundContext;
    ctx.resetTransform();
    ctx.fillStyle = game2.ClearStyle;
    ctx.fillRect(0, 0, game2.ViewportWidth, game2.ViewportHeight);
    ctx.transform(camera.Pv[0] / 2 * game2.ViewportWidth, -(camera.Pv[1] / 2) * game2.ViewportWidth, -(camera.Pv[2] / 2) * game2.ViewportHeight, camera.Pv[3] / 2 * game2.ViewportHeight, (camera.Pv[4] + 1) / 2 * game2.ViewportWidth, (camera.Pv[5] + 1) / 2 * game2.ViewportHeight);
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY7) == QUERY7) {
        let node = game2.World.SpatialNode2D[ent];
        ctx.save();
        ctx.transform(node.World[0], -node.World[1], -node.World[2], node.World[3], node.World[4], -node.World[5]);
        let draw = game2.World.Draw[ent];
        switch (draw.Kind) {
          case 1 /* Rect */: {
            ctx.fillStyle = draw.Color;
            ctx.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
            break;
          }
          case 2 /* Arc */: {
            ctx.fillStyle = draw.Color;
            ctx.beginPath();
            ctx.arc(0, 0, draw.Radius, draw.StartAngle, draw.EndAngle);
            ctx.fill();
            break;
          }
        }
        ctx.restore();
      }
    }
  }

  // ../src/components/com_children.ts
  function destroy_all(world, entity) {
    if (world.Signature[entity] & 64 /* Children */) {
      for (let child of world.Children[entity].Children) {
        destroy_all(world, child);
      }
    }
    if (world.Signature[entity] === 0 /* None */) {
    } else {
      world.DestroyEntity(entity);
    }
  }

  // ../src/systems/sys_lifespan.ts
  var QUERY8 = 512 /* Lifespan */;
  function sys_lifespan(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY8) == QUERY8) {
        update3(game2, i, delta);
      }
    }
  }
  function update3(game2, entity, delta) {
    let lifespan2 = game2.World.Lifespan[entity];
    lifespan2.Remaining -= delta;
    if (lifespan2.Remaining < 0) {
      if (lifespan2.Action) {
        dispatch(game2, lifespan2.Action, entity);
      }
      destroy_all(game2.World, entity);
    }
  }

  // ../src/systems/sys_move2d.ts
  var QUERY9 = 1024 /* LocalTransform2D */ | 2048 /* Move2D */ | 128 /* Dirty */;
  function sys_move2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY9) === QUERY9) {
        update4(game2, i, delta);
      }
    }
  }
  var direction = [0, 0];
  function update4(game2, entity, delta) {
    let local = game2.World.LocalTransform2D[entity];
    let move = game2.World.Move2D[entity];
    if (move.Direction[0] || move.Direction[1]) {
      direction[0] = move.Direction[0];
      direction[1] = move.Direction[1];
      let amount = Math.min(1, length(direction));
      if (game2.World.Signature[entity] & 65536 /* SpatialNode2D */) {
        let node = game2.World.SpatialNode2D[entity];
        if (node.Parent !== void 0) {
          let parent = game2.World.SpatialNode2D[node.Parent];
          transform_direction(direction, direction, parent.Self);
        } else {
          transform_direction(direction, direction, node.World);
        }
      } else {
        rotate(direction, direction, local.Rotation);
      }
      normalize(direction, direction);
      scale(direction, direction, amount * move.MoveSpeed * delta);
      add(local.Translation, local.Translation, direction);
      move.Direction[0] = 0;
      move.Direction[1] = 0;
    }
    if (move.Rotation) {
      local.Rotation += move.Rotation * move.RotationSpeed * delta;
      move.Rotation = 0;
    }
  }

  // ../src/systems/sys_physics2d_integrate.ts
  var QUERY10 = 1024 /* LocalTransform2D */ | 16384 /* RigidBody2D */;
  var GRAVITY = -9.8;
  function sys_physics2d_integrate(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY10) === QUERY10) {
        update5(game2, ent, delta);
      }
    }
  }
  var velocity_delta = [0, 0];
  function update5(game2, entity, delta) {
    let local = game2.World.LocalTransform2D[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    if (rigid_body.Kind === 1 /* Dynamic */) {
      rigid_body.VelocityLinear[1] += GRAVITY * delta;
      scale(rigid_body.Acceleration, rigid_body.Acceleration, delta);
      add(rigid_body.VelocityLinear, rigid_body.VelocityLinear, rigid_body.Acceleration);
      scale(rigid_body.VelocityLinear, rigid_body.VelocityLinear, 1 - rigid_body.Friction);
      scale(velocity_delta, rigid_body.VelocityLinear, delta);
      add(local.Translation, local.Translation, velocity_delta);
      local.Rotation += rigid_body.VelocityAngular * delta;
      game2.World.Signature[entity] |= 128 /* Dirty */;
      set2(rigid_body.Acceleration, 0, 0);
    }
  }

  // ../src/systems/sys_physics2d_resolve.ts
  var QUERY11 = 1024 /* LocalTransform2D */ | 4 /* Collide2D */ | 16384 /* RigidBody2D */;
  function sys_physics2d_resolve(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY11) === QUERY11) {
        update6(game2, ent);
      }
    }
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY11) === QUERY11) {
        let rigid_body = game2.World.RigidBody2D[ent];
        if (rigid_body.Kind === 1 /* Dynamic */) {
          copy2(rigid_body.VelocityLinear, rigid_body.VelocityResolved);
        }
      }
    }
  }
  var a = [0, 0];
  function update6(game2, entity) {
    let local = game2.World.LocalTransform2D[entity];
    let rigid_body = game2.World.RigidBody2D[entity];
    let collide = game2.World.Collide2D[entity];
    if (rigid_body.Kind === 1 /* Dynamic */) {
      rigid_body.IsGrounded = false;
      let has_collision = false;
      for (let i = 0; i < collide.Collisions.length; i++) {
        let collision = collide.Collisions[i];
        if (game2.World.Signature[collision.Other] & 16384 /* RigidBody2D */) {
          has_collision = true;
          add(local.Translation, local.Translation, collision.Hit);
          game2.World.Signature[entity] |= 128 /* Dirty */;
          let other_body = game2.World.RigidBody2D[collision.Other];
          switch (other_body.Kind) {
            case 0 /* Static */:
              normalize(a, collision.Hit);
              scale(a, a, -2 * dot(rigid_body.VelocityLinear, a));
              add(rigid_body.VelocityResolved, rigid_body.VelocityLinear, a);
              break;
            case 1 /* Dynamic */:
              copy2(rigid_body.VelocityResolved, other_body.VelocityLinear);
              break;
          }
          scale(rigid_body.VelocityResolved, rigid_body.VelocityResolved, rigid_body.Bounciness);
          if (collision.Hit[1] > 0 && rigid_body.VelocityResolved[1] < 1) {
            rigid_body.VelocityResolved[1] = 0;
            rigid_body.IsGrounded = true;
          }
        }
      }
      if (!has_collision) {
        copy2(rigid_body.VelocityResolved, rigid_body.VelocityLinear);
      }
    }
  }

  // ../src/systems/sys_poll.ts
  var QUERY12 = 262144 /* Task */;
  function sys_poll(game2, delta) {
    let tasks_to_complete = [];
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY12) === QUERY12) {
        if (has_blocking_dependencies(game2.World, ent)) {
          continue;
        }
        let task = game2.World.Task[ent];
        switch (task.Kind) {
          case 0 /* When */: {
            if (task.Predicate(ent)) {
              tasks_to_complete.push(ent);
            }
            break;
          }
          case 1 /* Delay */: {
            task.Remaining -= delta;
            if (task.Remaining < 0) {
              tasks_to_complete.push(ent);
            }
            break;
          }
          case 2 /* Then */: {
            tasks_to_complete.push(ent);
            break;
          }
        }
      }
    }
    for (let ent of tasks_to_complete) {
      let task = game2.World.Task[ent];
      switch (task.Kind) {
        case 2 /* Then */:
          task.Callback(ent);
        case 0 /* When */:
        case 1 /* Delay */:
          game2.World.DestroyEntity(ent);
      }
      delete game2.World.Task[ent];
    }
  }
  function has_blocking_dependencies(world, entity) {
    if (world.Signature[entity] & 64 /* Children */) {
      let children = world.Children[entity];
      for (let child of children.Children) {
        if (world.Signature[child] & 262144 /* Task */) {
          return true;
        }
      }
    }
    return false;
  }

  // ../src/systems/sys_render2d.ts
  function sys_render2d(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      let signature = game2.World.Signature[ent] & (8192 /* Render2D */ | 65536 /* SpatialNode2D */);
      let offset = ent * FLOATS_PER_INSTANCE + 7;
      if (game2.InstanceData[offset] !== signature) {
        game2.InstanceData[offset] = signature;
      }
    }
    for (let camera_entity of game2.Cameras) {
      let camera = game2.World.Camera2D[camera_entity];
      game2.Gl.bindFramebuffer(GL_FRAMEBUFFER, null);
      game2.Gl.viewport(0, 0, game2.ViewportWidth, game2.ViewportHeight);
      game2.Gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
      render_all(game2, camera);
      break;
    }
  }
  function render_all(game2, eye) {
    let material = game2.MaterialRender2D;
    let sheet = game2.Spritesheet;
    game2.Gl.useProgram(material.Program);
    game2.Gl.uniformMatrix3x2fv(material.Locations.Pv, false, eye.Pv);
    game2.Gl.activeTexture(GL_TEXTURE0);
    game2.Gl.bindTexture(GL_TEXTURE_2D, sheet.Texture);
    game2.Gl.uniform1i(material.Locations.SheetTexture, 0);
    game2.Gl.uniform2f(material.Locations.SheetSize, sheet.Width, sheet.Height);
    game2.Gl.bindBuffer(GL_ARRAY_BUFFER, game2.InstanceBuffer);
    game2.Gl.bufferData(GL_ARRAY_BUFFER, game2.InstanceData, GL_STREAM_DRAW);
    game2.Gl.drawArraysInstanced(material.Mode, 0, 4, game2.World.Signature.length);
  }

  // ../src/systems/sys_render2d_animate.ts
  var QUERY13 = 1 /* AnimateSprite */ | 8192 /* Render2D */;
  function sys_render2d_animate(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY13) === QUERY13) {
        update7(game2, i, delta);
      }
    }
  }
  function update7(game2, entity, delta) {
    let animate = game2.World.AnimateSprite[entity];
    for (let frame_name in animate.Frames) {
      let frame_timestamp = animate.Frames[frame_name];
      if (animate.Time < frame_timestamp) {
        set_sprite(game2, entity, frame_name);
        break;
      }
    }
    animate.Time += delta;
    if (animate.Time >= animate.Duration) {
      animate.Time -= animate.Duration;
    }
  }

  // ../src/systems/sys_resize2d.ts
  var QUERY14 = 2 /* Camera2D */;
  var UNIT_PX = 32;
  function sys_resize2d(game2, delta) {
    if (game2.ViewportWidth != window.innerWidth || game2.ViewportHeight != window.innerHeight) {
      game2.ViewportResized = true;
    }
    if (game2.ViewportResized) {
      game2.ViewportWidth = game2.BackgroundCanvas.width = game2.SceneCanvas.width = game2.ForegroundCanvas.width = window.innerWidth;
      game2.ViewportHeight = game2.BackgroundCanvas.height = game2.SceneCanvas.height = game2.ForegroundCanvas.height = window.innerHeight;
      for (let ent = 0; ent < game2.World.Signature.length; ent++) {
        if ((game2.World.Signature[ent] & QUERY14) === QUERY14) {
          update8(game2, ent);
        }
      }
    }
  }
  function update8(game2, entity) {
    let camera = game2.World.Camera2D[entity];
    camera.ViewportWidth = game2.ViewportWidth;
    camera.ViewportHeight = game2.ViewportHeight;
    let projection = camera.Projection;
    let aspect = game2.ViewportWidth / game2.ViewportHeight;
    if (projection.Radius[0] === 0 && projection.Radius[1] === 0) {
      let radius = game2.ViewportHeight / UNIT_PX / 2;
      from_ortho(projection.Inverse, radius * aspect, radius);
    } else {
      let target_aspect = projection.Radius[0] / projection.Radius[1];
      if (aspect < target_aspect) {
        from_ortho(projection.Inverse, projection.Radius[0], projection.Radius[0] / aspect);
      } else {
        from_ortho(projection.Inverse, projection.Radius[1] * aspect, projection.Radius[1]);
      }
    }
    invert(projection.Projection, projection.Inverse);
  }

  // ../src/systems/sys_shake2d.ts
  var QUERY15 = 1024 /* LocalTransform2D */ | 32768 /* Shake */;
  function sys_shake2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY15) == QUERY15) {
        update9(game2, i);
      }
    }
  }
  function update9(game2, entity) {
    let shake = game2.World.Shake[entity];
    let local = game2.World.LocalTransform2D[entity];
    local.Translation[0] = (Math.random() - 0.5) * shake.Radius * 2;
    local.Translation[1] = (Math.random() - 0.5) * shake.Radius * 2;
    game2.World.Signature[entity] |= 128 /* Dirty */;
  }

  // ../src/systems/sys_spawn2d.ts
  var QUERY16 = 65536 /* SpatialNode2D */ | 131072 /* Spawn */;
  function sys_spawn2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY16) == QUERY16) {
        update10(game2, i, delta);
      }
    }
  }
  var world_position = [0, 0];
  function update10(game2, entity, delta) {
    let spawn = game2.World.Spawn[entity];
    spawn.SinceLast += delta;
    if (spawn.SinceLast > spawn.Interval) {
      spawn.SinceLast = 0;
      let spatial_node = game2.World.SpatialNode2D[entity];
      get_translation(world_position, spatial_node.World);
      if (game2.World.Signature.length - game2.World.Graveyard.length < game2.World.Capacity) {
        instantiate(game2, [...spawn.Creator(game2), copy_position(world_position)]);
      } else if (false) {
        throw new Error("No more entities can be created; the world at maximum capacity.");
      }
    }
  }

  // ../src/systems/sys_toggle.ts
  var QUERY17 = 524288 /* Toggle */;
  function sys_toggle(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY17) == QUERY17) {
        update11(game2, i, delta);
      }
    }
  }
  function update11(game2, entity, delta) {
    let toggle = game2.World.Toggle[entity];
    toggle.SinceLast += delta;
    if (toggle.SinceLast > toggle.Frequency) {
      toggle.SinceLast = 0;
      if ((game2.World.Signature[entity] & toggle.Mask) === toggle.Mask) {
        game2.World.Signature[entity] &= ~toggle.Mask;
      } else {
        game2.World.Signature[entity] |= toggle.Mask;
      }
    }
  }

  // ../lib/math.ts
  var EPSILON = 1e-6;
  var DEG_TO_RAD = Math.PI / 180;
  var RAD_TO_DEG = 180 / Math.PI;

  // ../src/systems/sys_transform2d.ts
  var QUERY_DIRTY = 1024 /* LocalTransform2D */ | 128 /* Dirty */;
  var QUERY_NODE = 1024 /* LocalTransform2D */ | 65536 /* SpatialNode2D */;
  function sys_transform2d(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY_DIRTY) === QUERY_DIRTY) {
        if (game2.World.Signature[ent] & 65536 /* SpatialNode2D */) {
          update_spatial_node(game2, ent);
        } else {
          update_instance_data(game2, ent);
        }
      }
    }
  }
  function update_instance_data(game2, entity) {
    game2.World.Signature[entity] &= ~128 /* Dirty */;
    let local = game2.World.LocalTransform2D[entity];
    let instance_offset = entity * FLOATS_PER_INSTANCE;
    game2.InstanceData[instance_offset + 0] = local.Scale[0];
    game2.InstanceData[instance_offset + 1] = local.Scale[1];
    game2.InstanceData[instance_offset + 2] = local.Rotation * DEG_TO_RAD;
    game2.InstanceData[instance_offset + 4] = local.Translation[0];
    game2.InstanceData[instance_offset + 5] = local.Translation[1];
  }
  var world_position2 = [0, 0];
  function update_spatial_node(game2, entity, parent) {
    game2.World.Signature[entity] &= ~128 /* Dirty */;
    let local = game2.World.LocalTransform2D[entity];
    let node = game2.World.SpatialNode2D[entity];
    compose(node.World, local.Translation, local.Rotation * DEG_TO_RAD, local.Scale);
    if (parent !== void 0) {
      node.Parent = parent;
    }
    if (node.Parent !== void 0) {
      let parent_transform = game2.World.SpatialNode2D[node.Parent];
      multiply(node.World, parent_transform.World, node.World);
      if (node.IsGyroscope) {
        get_translation(world_position2, node.World);
        compose(node.World, world_position2, local.Rotation * DEG_TO_RAD, local.Scale);
      }
    }
    invert(node.Self, node.World);
    if (game2.World.Signature[entity] & 64 /* Children */) {
      let children = game2.World.Children[entity];
      for (let i = 0; i < children.Children.length; i++) {
        let child = children.Children[i];
        if ((game2.World.Signature[child] & QUERY_NODE) === QUERY_NODE) {
          update_spatial_node(game2, child, entity);
        }
      }
    }
  }

  // ../src/systems/sys_trigger2d.ts
  var QUERY18 = 4 /* Collide2D */ | 1048576 /* Trigger */;
  function sys_trigger2d(game2, delta) {
    for (let i = 0; i < game2.World.Signature.length; i++) {
      if ((game2.World.Signature[i] & QUERY18) === QUERY18) {
        update12(game2, i);
      }
    }
  }
  function update12(game2, entity) {
    let collide = game2.World.Collide2D[entity];
    let trigger = game2.World.Trigger[entity];
    for (let collision of collide.Collisions) {
      let other_collide = game2.World.Collide2D[collision.Other];
      if (trigger.Mask & other_collide.Layers) {
        dispatch(game2, trigger.Action, [entity, collision.Other]);
      }
    }
  }

  // ../lib/html.ts
  function shift(values) {
    let value = values.shift();
    if (typeof value === "boolean" || value == void 0) {
      return "";
    } else if (Array.isArray(value)) {
      return value.join("");
    } else {
      return value;
    }
  }
  function html(strings, ...values) {
    return strings.reduce((out, cur) => out + shift(values) + cur);
  }

  // ../src/ui/App.ts
  function App(game2) {
    return html` <div style="margin: 10px;">Duszki</div> `;
  }

  // ../src/systems/sys_ui.ts
  var prev;
  function sys_ui(game2, delta) {
    let next = App(game2);
    if (next !== prev) {
      game2.Ui.innerHTML = prev = next;
    }
  }

  // ../lib/pathfind.ts
  function path_find(nav, origin, goal) {
    let predecessors = [];
    let g = [];
    g[origin] = 0;
    let h = [];
    h[origin] = 0;
    let f = [];
    f[origin] = 0;
    let boundary = [origin];
    while (boundary.length > 0) {
      let lowest = lowest_cost(boundary, f);
      let current = boundary.splice(lowest, 1)[0];
      if (current === goal) {
        return [...path_follow(predecessors, goal)];
      }
      for (let i = 0; i < nav.Graph[current].length; i++) {
        let next = nav.Graph[current][i][0];
        let cost = nav.Graph[current][i][1];
        let g_next = g[current] + cost;
        if (g[next] === void 0) {
          h[next] = distance_squared(nav.Centroids[next], nav.Centroids[goal]);
          g[next] = g_next;
          f[next] = g_next + h[next];
          predecessors[next] = current;
          boundary.push(next);
        } else if (g_next + EPSILON < g[next]) {
          g[next] = g_next;
          f[next] = g_next + h[next];
          predecessors[next] = current;
        }
      }
    }
    return false;
  }
  function lowest_cost(boundary, cost) {
    let min = 0;
    for (let i = 0; i < boundary.length; i++) {
      if (cost[boundary[i]] + EPSILON < cost[boundary[min]]) {
        min = i;
      }
    }
    return min;
  }
  function* path_follow(path, goal) {
    while (goal !== void 0) {
      yield goal;
      goal = path[goal];
    }
  }

  // ../src/systems/sys_walk.ts
  var QUERY19 = 1024 /* LocalTransform2D */ | 2097152 /* Walk */ | 2048 /* Move2D */;
  function sys_walk(game2, delta) {
    for (let ent = 0; ent < game2.World.Signature.length; ent++) {
      if ((game2.World.Signature[ent] & QUERY19) == QUERY19) {
        update13(game2, ent);
      }
    }
  }
  function update13(game2, entity) {
    let nav = game2.World.Navigation;
    let walk2 = game2.World.Walk[entity];
    if (walk2.DestinationNode !== null) {
      console.time("path_find");
      let path = path_find(nav, walk2.DestinationNode, walk2.CurrentNode);
      console.timeEnd("path_find");
      if (path) {
        walk2.Path = path.slice(1);
      }
      walk2.DestinationNode = null;
    }
    if (walk2.Path.length > 0) {
      let local = game2.World.LocalTransform2D[entity];
      let next = walk2.Path[0];
      let diff = [0, 0];
      subtract(diff, nav.Centroids[next], local.Translation);
      if (length(diff) < 0.1) {
        walk2.Path.shift();
        if (walk2.Path.length == 0) {
          walk2.CurrentNode = next;
          walk2.DestinationNode = null;
        }
      } else {
        let move = game2.World.Move2D[entity];
        normalize(diff, diff);
        add(move.Direction, move.Direction, diff);
        game2.World.Signature[entity] |= 128 /* Dirty */;
      }
    }
  }

  // ../src/game.ts
  var WORLD_CAPACITY = 65536;
  var Game2 = class extends Game3D {
    constructor() {
      super();
      this.World = new World(WORLD_CAPACITY);
      this.MaterialRender2D = mat_render2d(this.Gl, 8192 /* Render2D */, 65536 /* SpatialNode2D */);
      this.Spritesheet = create_spritesheet_from(this.Gl, document.querySelector("img"));
      this.InstanceData = new Float32Array(this.World.Capacity * FLOATS_PER_INSTANCE);
      this.InstanceBuffer = this.Gl.createBuffer();
      this.ClearStyle = "#763b36";
      this.Gl.clearColor(0, 0, 0, 0);
      this.Gl.enable(GL_DEPTH_TEST);
      this.Gl.enable(GL_BLEND);
      this.Gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
      setup_render2d_buffers(this.Gl, this.InstanceBuffer);
    }
    FixedUpdate(delta) {
      sys_physics2d_integrate(this, delta);
      sys_transform2d(this, delta);
      sys_collide2d(this, delta);
      sys_physics2d_resolve(this, delta);
      sys_trigger2d(this, delta);
    }
    FrameUpdate(delta) {
      sys_poll(this, delta);
      sys_resize2d(this, delta);
      sys_camera2d(this, delta);
      sys_control_keyboard(this, delta);
      sys_control_mouse(this, delta);
      sys_control_ai(this, delta);
      sys_control_always2d(this, delta);
      sys_walk(this, delta);
      sys_move2d(this, delta);
      sys_lifespan(this, delta);
      sys_shake2d(this, delta);
      sys_toggle(this, delta);
      sys_spawn2d(this, delta);
      sys_transform2d(this, delta);
      sys_draw2d(this, delta);
      sys_render2d_animate(this, delta);
      sys_render2d(this, delta);
      sys_ui(this, delta);
    }
  };

  // ../maps/map_sample.ts
  var map_sample = { "compressionlevel": -1, "height": 20, "infinite": false, "layers": [{ "data": [14, 1610612787, 16, 1, 1, 3221225485, 1, 1, 1, 2, 3, 3, 3, 3, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 1610612787, 17, 3, 3, 4, 1, 1, 1, 14, 41, 41, 41, 41, 41, 16, 1, 1, 1, 1, 1, 25, 1, 1, 1, 1, 1, 1, 1, 1, 1073741837, 1, 14, 1610612787, 58, 41, 41, 16, 25, 1, 1, 14, 1610612789, 51, 51, 52, 51, 16, 2, 3, 4, 1, 1, 1, 1, 2, 3, 7, 3, 3, 3, 7, 3, 4, 14, 1610612787, 51, 52, 51, 16, 1, 1, 1, 14, 1610612787, 49, 3221225522, 49, 49, 16, 14, 41, 16, 1, 1, 536870925, 1, 14, 41, 19, 41, 30, 41, 19, 41, 16, 14, 1610612787, 5, 27, 27, 28, 1, 1073741837, 1, 14, 1610612787, 49, 49, 49, 49, 16, 14, 1610612789, 16, 1, 1, 1, 1073741837, 14, 1610612789, 31, 51, 51, 52, 31, 51, 16, 14, 1610612787, 16, 2, 3, 3, 3, 3, 4, 26, 27, 27, 27, 27, 27, 28, 14, 1610612787, 17, 7, 3, 3, 4, 14, 1610612787, 49, 49, 49, 49, 49, 49, 16, 14, 1610612787, 16, 14, 41, 41, 41, 41, 17, 3, 3, 3, 3, 4, 1, 1, 14, 1610612787, 58, 19, 41, 41, 16, 14, 1610612787, 49, 49, 49, 49, 49, 49, 16, 18, 1610612787, 17, 18, 1610612789, 51, 52, 51, 58, 41, 41, 22, 41, 16, 2684354573, 1, 14, 1610612787, 51, 31, 51, 51, 16, 14, 1610612787, 49, 49, 49, 49, 49, 49, 16, 60, 1610612787, 58, 60, 1610612787, 49, 49, 49, 51, 51, 51, 51, 51, 17, 3, 3, 18, 1610612787, 49, 43, 49, 3221225522, 17, 18, 1610612787, 49, 49, 49, 49, 49, 2684354610, 17, 51, 54, 51, 51, 54, 43, 49, 50, 49, 49, 49, 49, 49, 58, 41, 41, 60, 1610612787, 49, 49, 43, 49, 58, 60, 37, 38, 38, 38, 38, 38, 39, 58, 49, 43, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 51, 52, 51, 51, 54, 49, 49, 49, 49, 51, 52, 54, 49, 49, 49, 49, 49, 49, 51, 49, 49, 49, 5, 27, 6, 1610612790, 49, 49, 2147483698, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 5, 27, 27, 27, 27, 27, 27, 27, 27, 49, 49, 49, 16, 1, 14, 1610612787, 49, 49, 49, 49, 49, 49, 5, 27, 27, 27, 27, 27, 27, 6, 1610612790, 49, 16, 1, 1, 1, 1, 1, 1, 1, 1, 27, 27, 27, 28, 3221225485, 14, 1610612787, 68, 49, 5, 27, 27, 27, 28, 2, 3, 3, 3, 3, 3, 18, 1610612787, 49, 16, 1, 1, 1, 2, 3, 3, 3, 3, 1, 1, 1, 1, 2, 18, 1610612787, 84, 49, 17, 3, 4, 1, 1, 14, 41, 20, 41, 41, 21, 60, 1610612787, 49, 16, 1, 1, 1073741837, 14, 41, 11, 12, 41, 1, 2, 3, 3, 18, 60, 1610612787, 84, 49, 58, 41, 17, 3, 3, 18, 1610612789, 32, 51, 51, 33, 51, 54, 2147483698, 16, 1, 1, 1, 14, 1610612789, 51, 51, 51, 1, 14, 41, 41, 60, 1610612789, 54, 84, 49, 51, 51, 58, 41, 41, 60, 1610612787, 49, 43, 49, 49, 49, 49, 49, 17, 3, 3, 3, 18, 1610612787, 49, 49, 49, 1, 14, 1610612789, 52, 51, 54, 49, 84, 2147483698, 42, 49, 51, 51, 51, 51, 54, 43, 49, 49, 49, 49, 49, 49, 58, 41, 41, 41, 60, 1610612787, 49, 49, 49, 1, 14, 1610612787, 3758096434, 49, 49, 49, 94, 71, 71, 71, 71, 71, 72, 49, 49, 49, 49, 49, 49, 49, 43, 49, 51, 51, 51, 51, 51, 54, 49, 49, 49, 1, 14, 1610612787, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 84, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 3758096434, 49], "height": 20, "id": 1, "name": "Dungeon", "opacity": 1, "type": "tilelayer", "visible": true, "width": 32, "x": 0, "y": 0 }, { "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 76, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 0, 0, 0, 0, 1073741932, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 0, 65, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 0, 67, 0, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 0, 0, 109, 0, 0, 0, 0, 0, 0, 0, 0, 112, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 0, 73, 0, 0, 0, 0, 0, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 88, 0, 119, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 98, 0, 0, 0, 0, 0, 0, 85, 0, 0, 0, 2147483758, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 99, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 1, 1, 1, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 0, 0, 0, 0, 0, 0, 0, 0, 0, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2147483773, 0, 0, 0, 0, 0, 0, 0, 0, 2147483749, 0, 0, 0, 0, 0, 0, 0, 0, 94, 71, 71, 71, 71, 71, 72, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 82, 0, 0, 0, 76, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "height": 20, "id": 4, "name": "Objects", "opacity": 1, "type": "tilelayer", "visible": true, "width": 32, "x": 0, "y": 0 }, { "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 55, 55, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "height": 20, "id": 5, "name": "Carts", "opacity": 1, "type": "tilelayer", "visible": false, "width": 32, "x": 0, "y": 0 }, { "data": [0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 49, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 49, 49, 0, 0, 0, 0, 0, 49, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 0, 49, 49, 0, 0, 49, 0, 0, 0, 0, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 49, 0, 49, 0, 49, 0, 49, 0, 0, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 0, 49, 0, 0, 49, 49, 49, 49, 0, 0, 0, 49, 0, 0, 0, 0, 0, 49, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 0, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 49, 49, 49, 0, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 49, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 0, 0, 0, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 49, 49, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 0, 0, 0, 0, 0, 0, 49, 49, 0, 0, 0, 0, 0, 0, 0, 49, 49, 49, 0, 0, 0, 0, 0, 0, 49, 0, 49, 49, 0, 49, 49, 49, 0, 0, 0, 0, 0, 49, 49, 49, 0, 0, 0, 0, 0, 0, 49, 49, 0, 49, 49, 49, 0, 0, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 0, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 0, 0, 0, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 49, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 0, 0, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49], "height": 20, "id": 7, "name": "Navigation", "opacity": 0.25, "tintcolor": "#00ff00", "type": "tilelayer", "visible": true, "width": 32, "x": 0, "y": 0 }], "nextlayerid": 8, "nextobjectid": 1, "orientation": "orthogonal", "renderorder": "right-down", "tiledversion": "1.9.1", "tileheight": 16, "tilesets": [{ "firstgid": 1, "source": "../assets/Tiny Dungeon/Tiled/sampleSheet.tsx" }], "tilewidth": 16, "type": "map", "version": "1.9", "width": 32 };

  // ../src/tiled.ts
  function instantiate_tiled_layer(game2, layer, z) {
    for (let i = 0; i < layer.data.length; i++) {
      let global_id = layer.data[i];
      let tile_id = global_id & ~-268435456 /* All */;
      if (tile_id == 0) {
        continue;
      }
      let x = i % layer.width;
      let y = layer.height - Math.floor(i / layer.width) - 1;
      let local;
      if ((global_id & 1610612736 /* RotateLeft */) == 1610612736 /* RotateLeft */) {
        local = local_transform2d([x, y], 90);
      } else if ((global_id & -1610612736 /* RotateRight */) == -1610612736 /* RotateRight */) {
        local = local_transform2d([x, y], -90);
      } else if ((global_id & -1073741824 /* Rotate180 */) == -1073741824 /* Rotate180 */) {
        local = local_transform2d([x, y], 180);
      } else if (global_id & -2147483648 /* Horizontal */) {
        local = local_transform2d([x, y], 0, [-1, 1]);
      } else if (global_id & 1073741824 /* Vertical */) {
        local = local_transform2d([x, y], 0, [1, -1]);
      } else {
        local = local_transform2d([x, y]);
      }
      let tile_name = `${tile_id - 1}.png`.padStart(7, "0");
      instantiate(game2, [local, render2d(tile_name), order(z)]);
    }
  }

  // ../src/components/com_spatial_node2d.ts
  function spatial_node2d(is_gyroscope = false) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 65536 /* SpatialNode2D */ | 128 /* Dirty */;
      game2.World.SpatialNode2D[entity] = {
        World: game2.InstanceData.subarray(entity * FLOATS_PER_INSTANCE, entity * FLOATS_PER_INSTANCE + 6),
        Self: create(),
        IsGyroscope: is_gyroscope
      };
    };
  }

  // ../src/scenes/blu_camera.ts
  function blueprint_camera(game2) {
    return [
      spatial_node2d(),
      local_transform2d(),
      camera2d([game2.World.Width / 2 + 1, game2.World.Height / 2 + 1])
    ];
  }

  // ../src/components/com_control_player.ts
  function control_player() {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 32 /* ControlPlayer */;
      game2.World.ControlPlayer[entity] = {};
    };
  }

  // ../src/scenes/blu_cursor.ts
  function blueprint_cursor(game2) {
    return [local_transform2d(), control_player(), render2d("060.png"), order(1)];
  }

  // ../src/components/com_control_ai.ts
  function control_ai() {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 8 /* ControlAi */;
      game2.World.ControlAi[entity] = {};
    };
  }

  // ../src/components/com_move2d.ts
  function move2d(move_speed, rotation_speed) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 2048 /* Move2D */;
      game2.World.Move2D[entity] = {
        MoveSpeed: move_speed,
        RotationSpeed: rotation_speed,
        Direction: [0, 0],
        Rotation: 0
      };
    };
  }

  // ../src/components/com_walk.ts
  function walk(current_node) {
    return (game2, entity) => {
      game2.World.Signature[entity] |= 2097152 /* Walk */;
      game2.World.Walk[entity] = {
        CurrentNode: current_node,
        DestinationNode: null,
        Path: []
      };
    };
  }

  // ../src/scenes/blu_duszek.ts
  function blueprint_duszek(game2, origin) {
    return [
      local_transform2d(),
      copy_position(game2.World.Navigation.Centroids[origin]),
      render2d("121.png"),
      order(0.5),
      control_ai(),
      walk(origin),
      move2d(float(2, 4), 0)
    ];
  }

  // ../src/scenes/sce_dungeon.ts
  function scene_dungeon(game2) {
    game2.World = new World(WORLD_CAPACITY);
    game2.ViewportResized = true;
    instantiate(game2, [
      ...blueprint_camera(game2),
      set_position(game2.World.Width / 2 - 0.5, game2.World.Height / 2 - 0.5)
    ]);
    instantiate(game2, [
      ...blueprint_cursor(game2),
      set_position(game2.World.Width / 2, game2.World.Height / 2)
    ]);
    instantiate_tiled_layer(game2, map_sample.layers[0], 0.1);
    instantiate_tiled_layer(game2, map_sample.layers[1], 0.6);
    instantiate_tiled_layer(game2, map_sample.layers[2], 0.7);
    let nav = map_sample.layers[3];
    for (let i = 0; i < nav.data.length; i++) {
      let tile = nav.data[i];
      if (tile == 0) {
        continue;
      }
      game2.World.Navigation.Centroids[i] = node_to_position(game2.World, i);
      game2.World.Navigation.Graph[i] = [];
      let edges = game2.World.Navigation.Graph[i];
      if (i > 0 && nav.data[i - 1] > 0) {
        edges.push([i - 1, 1]);
      }
      if (i < nav.data.length - 1 && nav.data[i + 1] > 0) {
        edges.push([i + 1, 1]);
      }
      if (i > nav.width && nav.data[i - nav.width] > 0) {
        edges.push([i - nav.width, 1]);
      }
      if (i < nav.data.length - nav.width && nav.data[i + nav.width] > 0) {
        edges.push([i + nav.width, 1]);
      }
    }
    let node_ids = game2.World.Navigation.Graph.map((_, i) => i).filter((i) => i !== void 0);
    let duszki = 100;
    for (let i = 0; i < duszki; i++) {
      let origin = element(node_ids);
      instantiate(game2, blueprint_duszek(game2, origin));
    }
  }

  // ../src/index.ts
  var game = new Game2();
  scene_dungeon(game);
  game.Start();
  window.$ = dispatch.bind(null, game);
  window.game = game;
})();
