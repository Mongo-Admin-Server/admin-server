interface EventCallback {
  (data: any): void;
}

interface EventEmitter {
  events: { [event: string]: EventCallback[] };
  dispatch(event: string, data: any): void;
  subscribe(event: string, callback: EventCallback): void;
}

const eventEmitter: EventEmitter = {
  events: {},
  dispatch(event: string, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  },
  subscribe(event: string, callback: EventCallback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
};

export default eventEmitter;