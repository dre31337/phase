import { Shape } from "./Shape";

export class Rectangle extends Shape {
    
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  constructor() {
    super();
  }
  
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