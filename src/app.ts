/**
 * Overview:
 * 
 * #2 Path editing — Easiest way is just rendering vectors on 2d canvas and using that as a texture, but maybe that's not
 *    what you want to see. I could do full GPU vector rendering, implementing GPU Gems approach, but due to my tight
 *    timeframe available let's omit this task. Rebuilding mesh on editing may be slow for big segments counts :)
 *    https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-25-rendering-vector-art-gpu
 * 
 *    Other solution may be using combination of raycasting + sdfs, accelerating with 2D BVH (BBH?) to support thousands
 *    of segments, but that may suffer from numerical precision erros, like in this Coding Adventures video:
 *    https://www.youtube.com/watch?v=SO83KQuuZvg
 *    On big shape editing this may work faster then GPU Gems approach, but editing SVG will still be a better solution.
 * 
 *    I'm not sure you really need all of this, but that job is titled Graphics Engineer, not a Middle SE who can rasterize
 *    SVGs with canvas, so just in case :)
 * 
 * #3 Text — Easy using MSDF, but OGL which I'm going to use has it's own implementation and just rewriting that is kinda
 *    cheating.
 * 
 * #4 Masking — with rendering vector on 2d canvas this is trivial, but as well as with task #2 it's not clear how should I
 *    render vectors.
 * 
 * PS: Later I've understood that not using svgs makes these extremely difficult :)
 *     But, I've achieved an ability to zoom infinitely into rectangles
 */

import { Rectangle } from "./elements/Rectangle";
import { Shape } from "./elements/Shape";
import { Triangle } from "./elements/Triangle";
import { App } from "./phase/App";

function demo () {
  // the fact this array is called data array makes me this this objects may be just a DTOs
  const dataArray: Shape[] = [];
  {
    const newShape = new Rectangle();
    newShape.setDimension({
      x: -100, y: -200, width: 200, height: 400
    });
    newShape.addFill({
      type: "SOLID",
      color: [0.3, 0.3, 0.3, 1]
    });
    newShape.addStroke({
      type: "SOLID",
      color: [0.3, 0.7, 0.3, 1.0]
    });
    newShape.setStrokePosition("CENTER"); // ‘OUTSIDE’, ‘INSIDE’
    newShape.setStrokeWidth(20);
    newShape.setStrokeRadius(10);
    dataArray.push(newShape);
  }
  {
    const newShape = new Triangle();
    newShape.setDimension({
      x: -100, y: 200, width: 400, height: 200
    });
    newShape.addFill({
      type: "SOLID",
      color: [0.9, 0.3, 0.3, 1]
    });
    newShape.addStroke({
      type: "SOLID",
      color: [0.0, 0.3, 1.0, 1.0]
    });
    newShape.setStrokePosition("CENTER");
    newShape.setStrokeWidth(20);
    newShape.setStrokeRadius(20);
    dataArray.push(newShape);
  }
  return dataArray;
}

const app = App.get();
const data = demo();
app.addShape(...data);
