import { Shape } from "./Shape";

export class Triangle extends Shape {
  
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor() {
    super();
  }
  
  // Not sure if that's a good way to define a triangle, I would discuss that :)
  // That's the reason why this is a separate class from Rectangle, it should have it's own fields in the future
  setDimension = ({ x, y, width, height }: { x: number, y: number, width: number, height: number }) => {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.dispatch(Shape.updateEvent, this);
  }

  public get x(): number {
    return this._x;
  }
  public get y(): number {
    return this._y;
  }
  public get width(): number {
    return this._width;
  }
  public get height(): number {
    return this._height;
  }
  
}