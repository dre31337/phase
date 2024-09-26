import { Mesh } from "ogl";
import { Rectangle as RectangleShape } from "../../elements/Rectangle";
import { Shape } from "../../elements/Shape";
import { Triangle as TriangleShape } from "../../elements/Triangle";
import { RectangleMesh } from "./Rectangle";
import { TriangleMesh } from "./Triangle";

export const MeshFactory = {
  createMesh: (shape: Shape): Mesh => {
    switch (true) {
      case shape instanceof TriangleShape: 
        return new TriangleMesh(shape);
      case shape instanceof RectangleShape:
        return new RectangleMesh(shape);
      default:
        throw `Unknown shape type: ${typeof shape}!`;
    }
  }
}
