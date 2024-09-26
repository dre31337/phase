#version 300 es

precision highp float;

in vec2 vUv;
in vec2 vPosition;

uniform vec2 size;
uniform vec4 fillColor;
uniform vec4 strokeColor;
uniform vec2 stroke;
uniform float radius;

out vec4 FragColor;

float dBox(float edge) {
  vec2 b = size * 0.5 + (stroke.y + edge) * stroke.x - radius;
  vec2 d = abs(vPosition) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;
}

float aaStep(float gradient) {
  float deriv = fwidth(gradient);
  float aa = 0.5 * (gradient + deriv) / deriv;
  return clamp(aa, 0., 1.);
}

vec4 blendOver(vec4 a, vec4 b) {
  float newAlpha = mix(b.w, 1.0, a.w);
  vec3 newColor = mix(b.w * b.xyz, a.xyz, a.w);
  float divideFactor = (newAlpha > 1e-6? (1.0 / newAlpha) : 1.0);
  return vec4(divideFactor * newColor, newAlpha);
}

void main() {
  vec4 color = vec4(0.);

  float dBase = dBox(-0.5);
  float dStrokeIn = dBox(-1.0);
  float dStrokeOut = dBox(0.0);

  float mixFill = aaStep(-dBase);
  color = fillColor * mixFill;

  float mixStroke = aaStep(dStrokeIn) * aaStep(-dStrokeOut);
  color = blendOver(vec4(strokeColor.rgb, mixStroke * strokeColor.a), color);

  FragColor = color;
}
