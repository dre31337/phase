import { EventBus } from "../util/EventBus";

export class Tick {

  static readonly event = "Tick.event";
  static readonly beforeRenderEvent = "Tick.beforeRenderEvent";
  static readonly renderEvent = "Tick.renderEventEvent";
  static readonly afterRenderEvent = "Tick.afterRenderEvent";

  static readonly timeProvider = "Tick.time";
  static readonly secondsProvider = "Tick.seconds";
  static readonly deltaSecondsProvider = "Tick.ds";

  private prevTime = -1;

  constructor() {
    requestAnimationFrame(this.onAnimFrame);
  }

  private onAnimFrame = (time: number) => {
    if (this.prevTime < 0) {
      this.prevTime = time;
    }
    
    const dt = Math.min(1e3 / 30, time - this.prevTime);
    const ds = dt * 1e-3;
    const seconds = time * 1e-3;
    this.prevTime = time;

    const times = { time, dt, seconds, ds };

    // provide(Tick.timeProvider, time);
    // provide(Tick.secondsProvider, seconds);
    // provide(Tick.deltaSecondsProvider, ds);

    EventBus.dispatch(Tick.event, times);

    EventBus.dispatch(Tick.beforeRenderEvent, times);
    EventBus.dispatch(Tick.renderEvent, times);
    EventBus.dispatch(Tick.afterRenderEvent, times);

    requestAnimationFrame(this.onAnimFrame);
  };
}
