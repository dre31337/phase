import { v4 as getUUID } from "uuid";
import { EventDispatcher } from "../util/EventBus";
import { Fill, FillType } from "./Fill";
import { Stroke, StrokePosition, StrokeType } from "./Stroke";
import { ColorType } from "./Types";

export abstract class Shape extends EventDispatcher {

  static readonly updateEvent = "Shape.updateEvent";

  protected uuid = getUUID();
  public fill = new Fill();
  public stroke = new Stroke();

  addFill = (
    { type, color = [1, 1, 1, 1], imageURL = "" }:
    { type: FillType | string, color: ColorType, imageURL?: string }
  ) => {
    this.fill.type = type;
    this.fill.color = color;
    this.fill.imageURL = imageURL;
    this.dispatch(Shape.updateEvent, this);
  }

  addStroke = (
    { type, color = [1, 1, 1, 1], imageURL = "" }:
    { type: StrokeType | string, color: ColorType, imageURL?: string }
  ) => {
    this.stroke.type = type;
    this.stroke.color = color;
    this.stroke.imageURL = imageURL;
    this.dispatch(Shape.updateEvent, this);
  }

  setStrokePosition = (strokePosition: StrokePosition | string) => {
    this.stroke.position = strokePosition;
    this.dispatch(Shape.updateEvent, this);
  }

  setStrokeWidth = (width: number) => {
    this.stroke.width = width;
    this.dispatch(Shape.updateEvent, this);
  }

  setStrokeRadius = (radius: number) => {
    this.stroke.radius = radius;
    this.dispatch(Shape.updateEvent, this);
  }
}