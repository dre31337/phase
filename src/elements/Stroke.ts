import { ColorType } from "./Types";

export enum StrokeType {
  none,
  solid,
  image,
}

export enum StrokePosition {
  inside,
  center,
  outside,
}

export class Stroke {
  private _type = StrokeType.none;
  public color: ColorType = [1, 1, 1, 1];
  public imageURL = "";
  public radius = 0;

  private _position = StrokePosition.center;
  public width = 0;
  
  public get type(): StrokeType {
    return this._type;
  }
  public set type(value: StrokeType | string) {
    if (typeof value === "string") {
      value = Stroke.stringToStrokeType(value);
    }
    this._type = value;
  }

  public get position(): StrokePosition {
    return this._position;
  }
  public set position(value: StrokePosition | string) {
    if (typeof value === "string") {
      value = Stroke.stringToStrokePosition(value);
    }
    this._position = value;
  }

  static stringToStrokeType = (value: string): StrokeType => {
    switch(value.toLowerCase()) {
      case "none":
        return StrokeType.none;
      case "solid":
        return StrokeType.solid;
      case "image":
        return StrokeType.image;
      default:
        console.warn(`StrokeType "${value}" is not recognized! Using "none" instead.`);
        return StrokeType.none;
    }
  }

  static stringToStrokePosition = (value: string): StrokePosition => {
    switch(value.toLowerCase()) {
      case "center":
        return StrokePosition.center;
      case "inside":
        return StrokePosition.inside;
      case "outside":
        return StrokePosition.outside;
      default:
        console.warn(`StrokePosition "${value}" is not recognized! Using "center" instead.`);
        return StrokePosition.center;
    }
  }
}