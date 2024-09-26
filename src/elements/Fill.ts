import { ColorType } from "./Types";

export enum FillType {
  none,
  solid,
  image,
}

export class Fill {
  private _type = FillType.none;
  public color: ColorType = [1, 1, 1, 1];
  public imageURL = "";

  public get type() {
    return this._type;
  }
  public set type(value: FillType | string) {
    if (typeof value === "string") {
      value = Fill.stringToFillType(value);
    }
    this._type = value;
  }

  static stringToFillType = (value: string): FillType => {
    switch(value.toLowerCase()) {
      case "none":
        return FillType.none;
      case "solid":
        return FillType.solid;
      case "image":
        return FillType.image;
      default:
        console.warn(`FillType "${value}" is not recognized! Using "none" instead.`);
        return FillType.none;
    }
  }
}