import { Geometry, Mesh, Program, Vec2, Vec4 } from "ogl";
import { FillType } from "../../elements/Fill";
import { Rectangle as RectangleShape } from "../../elements/Rectangle";
import { Shape } from "../../elements/Shape";
import { App } from "../App";

import { StrokeType } from "../../elements/Stroke";
import fragment from "./shaders/rectangle.frag";
import vertex from "./shaders/rectangle.vert";

export class RectangleMesh extends Mesh {

  private uniforms: { [key: string]: any } = {};

  private size: Vec2 = new Vec2();
  private fillColor: Vec4 = new Vec4();
  private strokeColor: Vec4 = new Vec4();
  private stroke: Vec2 = new Vec2();

  constructor(private shape: RectangleShape) {

    const uniforms = {
      scale: { value: null },
      size: { value: null },
      fillColor: { value: null },
      strokeColor: { value: null },
      stroke: { value: null },
      radius: { value: 0 },
    };
    
    const geometry = new Geometry(App.gl(), {
      position: { size: 2, data: new Float32Array([-0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5]) },
      uv: { size: 2, data: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]) },
      index: { data: new Uint16Array([0, 2, 1, 1, 2, 3]) },
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

    this.onShapeUpdate(shape);

    shape.on(Shape.updateEvent, this.onShapeUpdate);
  }

  private onShapeUpdate = (shape: RectangleShape) => {

    this.fillColor.fromArray(shape.fill.color);
    if (shape.fill.type == FillType.none) {
      this.fillColor[3] = 0;
    }

    this.strokeColor.fromArray(shape.stroke.color);
    if (shape.stroke.type == StrokeType.none) {
      this.strokeColor[3] = 0;
    }

    const strokeFactor = this.shape.stroke.position,
          strokeMargin = this.shape.stroke.width * strokeFactor * 2 + 2;

    this.stroke.x = shape.stroke.width;
    this.stroke.y = shape.stroke.position * 0.5;

    this.uniforms.radius.value = shape.stroke.radius;
    
    this.size.set(this.shape.width, this.shape.height);
    this.position.x = shape.x;
    this.position.y = shape.y;
    this.scale.set(shape.width + strokeMargin, shape.height + strokeMargin, 1);
  };
}
