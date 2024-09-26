#version 300 es

precision highp float;

in vec2 uv;
in vec2 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec2 stroke;
uniform vec3 scale;
uniform vec2 cs;

out vec2 vPosition;
out vec2 vUv;

void main() {
  vUv = uv;

  vPosition = scale.xy * position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.0, 1.0);
}
