import {link, Material} from "../lib/material.js";
import {GL_TRIANGLE_STRIP} from "../lib/webgl.js";
import {Has} from "../src/world.js";
import {Attribute, Render2DLayout} from "./layout2d.js";

function vertex() {
    return `#version 300 es\n
    uniform mat3x2 pv;

    // Vertex attributes
    layout(location=${Attribute.VertexPosition}) in vec2 ap;
    layout(location=${Attribute.VertexTexCoord}) in vec2 at;

    // Instance attributes
    layout(location=${Attribute.InstanceRotation}) in vec4 ar;
    layout(location=${Attribute.InstanceTranslation}) in vec4 an;
    layout(location=${Attribute.InstanceColor}) in vec4 ac;
    layout(location=${Attribute.InstanceSprite}) in vec4 as;

    out vec2 vt;
    out vec4 vc;

    void main() {
        if((int(an.w) & ${Has.Render2D})==${Has.Render2D}) {
            vec3 p=mat3(pv)*mat3(mat3x2(ar,an.xy))*vec3(ap,1);
            gl_Position=vec4(p.xy,-an.z,1);
            vt=(as.xy+vec2(16,16)*at)/vec2(16,951);
            vc=ac;
        }else{
            gl_Position.z=2.;
        }
    }`;
}

let fragment = `#version 300 es\n
    precision mediump float;

    uniform sampler2D st;

    in vec2 vt;
    in vec4 vc;

    out vec4 fc;

    void main(){
        vec4 tc=texture(st,vt);
        if (tc.r*tc.g*tc.b*tc.a==1.) {
            fc=tc;
        }else{
            fc=vc*texture(st,vt);
            if(fc.a==0.)discard;
            fc.rgb*=fc.a;
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
            SheetTexture: gl.getUniformLocation(program, "st")!,
        },
    };
}
