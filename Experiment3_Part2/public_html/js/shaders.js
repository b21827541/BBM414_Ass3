/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const vShader = `#version 300 es
    in vec4 a_position;
    in vec4 a_color;
    uniform float angle;
    uniform float sx, sy, sz;
    uniform vec4 u_Translation;
    out vec4 color;
    void main() {
        float cosin = cos(angle);
        float sinus = sin(angle);
        mat4 rotMatrixZ = mat4(cosin, -sinus, 0, 0,
                               sinus, cosin, 0, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        mat4 scaleMatrix = mat4(sx, 0.0, 0.0, 0.0,
                                0.0, sy, 0.0, 0.0,
                                0.0, 0.0, sz, 0.0,
                                0.0, 0.0, 0.0, 1.0
        );
        gl_Position = rotMatrixZ * a_position * scaleMatrix + u_Translation;
        color = a_color;
    }
`;

const fShader = `#version 300 es
    precision highp float;
    in vec4 color;
    uniform float bruh;
    out vec4 o_color;
    void main() {
        o_color = color + bruh;
    }
`;


