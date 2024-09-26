import { Geometry, Mesh, Program, Vec2, Vec4 } from "ogl";
import { Shape } from "../../elements/Shape";
import { Triangle as TriangleShape } from "../../elements/Triangle";
import { App } from "../App";

import { FillType } from "../../elements/Fill";
import { StrokeType } from "../../elements/Stroke";
import fragment from "./shaders/triangle.frag";
import vertex from "./shaders/triangle.vert";

export class TriangleMesh extends Mesh {

  private uniforms: { [key: string]: any } = {};

  private size: Vec2 = new Vec2();
  private fillColor: Vec4 = new Vec4();
  private strokeColor: Vec4 = new Vec4();
  private stroke: Vec2 = new Vec2();

  private tan: number;

  constructor(private shape: TriangleShape) {

    const uniforms = {
      scale: { value: null },
      size: { value: null },
      fillColor: { value: null },
      strokeColor: { value: null },
      stroke: { value: null },
      radius: { value: 0 },
    };

    const geometry = new Geometry(App.gl(), {
      position: { size: 2, data: new Float32Array([-0.5, -0.5, 0.5, 0.5, 0.5, -0.5]) },
      uv: { size: 2, data: new Float32Array([0, 0, 1, 1, 1, 0]) },
      index: { data: new Uint16Array([2, 1, 0]) },
    });

    const program = new Program(App.gl(), {
      uniforms,
      vertex,
      fragment,
      transparent: true,
    });
    
    super(App.gl(), {
      geometry,
      program,
    });

    uniforms.scale.value = this.scale;
    uniforms.size.value = this.size;
    uniforms.fillColor.value = this.fillColor;
    uniforms.strokeColor.value = this.strokeColor;
    uniforms.stroke.value = this.stroke;

    this.uniforms = uniforms;

    this.position.z = Math.random() - 0.5;

    this.tan = shape.height / shape.width;

    this.onShapeUpdate(shape);

    shape.on(Shape.updateEvent, this.onShapeUpdate);
  }

  onShapeUpdate = (shape: TriangleShape) => {

    this.fillColor.fromArray(shape.fill.color);
    if (shape.fill.type == FillType.none) {
      this.fillColor[3] = 0;
    }

    this.strokeColor.fromArray(shape.stroke.color);
    if (shape.stroke.type == StrokeType.none) {
      this.strokeColor[3] = 0;
    }

    const strokeFactor = this.shape.stroke.position,
          strokeMargin0 = this.shape.stroke.width * strokeFactor * 2,
          nw = shape.width + strokeMargin0,
          nh = shape.height + strokeMargin0,
          nt = nh / nw / this.tan,
          sf = nt > 1 ? nt : 1 / nt,
          strokeMargin = strokeMargin0 * sf;

    this.stroke.x = shape.stroke.width;
    this.stroke.y = shape.stroke.position * 0.5;

    this.uniforms.radius.value = shape.stroke.radius;
    
    this.size.set(shape.width, shape.height);
    this.position.x = shape.x;
    this.position.y = shape.y;
    this.scale.set(shape.width + strokeMargin, shape.height + strokeMargin, 1);

  };
}
