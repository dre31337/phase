export class EventDispatcher {
  private listeners: { [key: string]: Function[] } = {};
  private dispatchingEventsCount: { [key: string]: number } = {};
  private listenersToRemove: { [key: string]: Function[] } = {};

  on = (event: string, callback: Function) => {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  };

  off = (event: string, callback: Function) => {
    if (event in this.dispatchingEventsCount && this.dispatchingEventsCount[event] > 0) {
      if (!(event in this.listenersToRemove)) {
        this.listenersToRemove[event] = [callback];
      } else {
        this.listenersToRemove[event].push(callback);
      }
      return;
    }
    this._off(event, callback);
  };

  private _off = (event: string, callback: Function) => {
    const arr = this.listeners[event];
    if (arr) {
      let index = arr.indexOf(callback);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    }
  };

  dispatch = (event: string, data) => {
    if (event in this.dispatchingEventsCount) {
      this.dispatchingEventsCount[event]++;
    } else {
      this.dispatchingEventsCount[event] = 1;
    }

    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
    
    this.dispatchingEventsCount[event]--;
    if (this.dispatchingEventsCount[event] == 0 && event in this.listenersToRemove && this.listenersToRemove[event].length > 0) {
      this.listenersToRemove[event].forEach(callback => this._off(event, callback));
      delete this.listenersToRemove[event];
    }
  };
}

export const EventBus = new EventDispatcher();