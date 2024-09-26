import { Vec2, Vec4 } from "ogl";
import { EventBus } from "../util/EventBus";

export class Viewport {

  static readonly updateEvent = "Viewport.updateEvent";

  cx = 0;
  cy = 0;
  x = 0;
  y = 0;
  v2 = new Vec2();
  iv2 = new Vec2();
  v4 = new Vec4();
  aspectRatio = 1;
  aspectRatioV2 = new Vec2();
  dpr = 1;
  private debounceTimeout: ReturnType<typeof setTimeout> | null;

  constructor(
    private readonly container: HTMLElement
  ) {
    this.update();

    window.addEventListener("resize", this.debounceResize);
  }

  private debounceResize = () => {
    if (this.debounceTimeout !== null) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(this.update, 333);
  };

  update = () => {
    this.dpr = window.devicePixelRatio;

    this.debounceTimeout = null;

    this.cx = this.container.clientWidth;
    this.cy = this.container.clientHeight;

    this.x = this.v2.x = this.v4.x = this.dpr * this.cx;
    this.y = this.v2.y = this.v4.y = this.dpr * this.cy;

    this.aspectRatio = this.x / this.y;

    this.aspectRatioV2.x = this.aspectRatio > 1 ? this.aspectRatio : 1;
    this.aspectRatioV2.y = this.aspectRatio > 1 ? 1 : this.y / this.x;

    this.iv2.x = this.v4.z = 1 / this.x;
    this.iv2.y = this.v4.w = 1 / this.y;

    EventBus.dispatch(Viewport.updateEvent, this);
  };

}