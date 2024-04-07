export enum Event {
  clearBoard = 'clearBoard',
  pauseGame = 'pauseGame',
  runOneCycle = 'runOneCycle',
  runInterval = 'runInterval',
  resize = 'resize',
  changeTheme = 'changeTheme',
  onThemeChanged = 'onThemeChanged',
}

type UnsubscribeFn = () => void;
type Callbacks = Function[];
type Listeners = {[key: string]: Callbacks};

class EventsController {
  private listeners: Listeners = {};

  public trigger(event: Event, ...rest: any): void {
    const listeners = this.listeners[event];

    if (!listeners || !listeners.length) {
      console.log('NO LISTENERS ATTACHED TO THE EVENT: ', event);

      return;
    }

    console.log('RUNNING ATTACHED LISTENERS FOR EVENT: ', event, listeners.length);
    listeners.forEach(listener => listener(rest));
  }

  public register(event: Event, callback: Function): UnsubscribeFn {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);

    return this.unsubscribe.bind(this, event, callback);
  }

  private unsubscribe(event: Event, callback: Function): void {
    if (!this.listeners[event]) {
      return;
    }

    const index = this.listeners[event].indexOf(callback);

    if (index === -1) {
      return;
    }

    this.listeners[event].splice(index, 1);
  }
}

export const eventsHandler =  new EventsController();
