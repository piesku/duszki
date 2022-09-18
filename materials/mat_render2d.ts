import {link, Material} from "../lib/material.js";
import {GL_TRIANGLE_STRIP} from "../lib/webgl.js";
import {Has} from "../src/world.js";
import {Attribute, Render2DLayout} from "./layout2d.js";

function vertex() {
    return `#version 300 es\n
    uniform mat3x2 pv;

    // Vertex attributes
    layout(location=${Attribute.VertexPosition}) in vec2 attr_position;
    layout(location=${Attribute.VertexTexCoord}) in vec2 attr_texcoord;

    // Instance attributes
    layout(location=${Attribute.InstanceRotation}) in vec4 attr_rotation; // [a, b, c, d]
    layout(location=${Attribute.InstanceTranslation}) in vec4 attr_translation; // [x, y, z, w: Signature]
    layout(location=${Attribute.InstanceColor}) in vec4 attr_color;
    layout(location=${Attribute.InstanceSprite}) in vec4 attr_sprite;

    out vec2 vert_texcoord;
    out vec4 vert_color;
    out vec4 vert_sprite;

    void main() {
        int signature = int(attr_translation.w);
        if ((signature & ${Has.Render2D}) == ${Has.Render2D}) {
            mat3x2 world = mat3x2(
                attr_rotation,
                attr_translation.xy
            );

            vec3 world_position = mat3(world) * vec3(attr_position, 1);
            vec3 clip_position = mat3(pv) * world_position;
            gl_Position = vec4(clip_position.xy, -attr_translation.z, 1);

            // attr_texcoords are +Y=down for compatibility with spritesheet frame coordinates.
            vert_texcoord = (attr_sprite.xy + vec2(16, 16) * attr_texcoord) / vec2(16, 951);
            vert_color = attr_color;
        } else {
            // Place the vertex outside the frustum.
            gl_Position.z = 2.0;
        }
    }`;
}

let fragment = `#version 300 es\n
    precision mediump float;

    uniform sampler2D sheet_texture;

    in vec2 vert_texcoord;
    in vec4 vert_color;

    out vec4 frag_color;

    void main() {
        vec4 tex_color = texture(sheet_texture, vert_texcoord);
        if (tex_color.r * tex_color.g * tex_color.b * tex_color.a == 1.0) {
            // 100% white; don't tint.
            frag_color = tex_color;
        } else {
            frag_color = vert_color * texture(sheet_texture, vert_texcoord);
            if (frag_color.a == 0.0) {
                discard;
            } else {
                // Premultiply alpha; it's used to highlight entities.
                frag_color.rgb *= frag_color.a;
            }
        }
    }
`;

export function mat_render2d(gl: WebGL2RenderingContext): Material<Render2DLayout> {
    let program = link(gl, vertex(), fragment);
    return {
        Mode: GL_TRIANGLE_STRIP,
        Program: program,
        Locations: {
            Pv: gl.getUniformLocation(program, "pv")!,
            World: gl.getUniformLocation(program, "world")!,
            SheetTexture: gl.getUniformLocation(program, "sheet_texture")!,
        },
    };
}
