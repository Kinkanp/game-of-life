import { Event, eventsHandler } from './events-controller';

export const setControlListeners = () => {
  document.getElementById('start')!
    .addEventListener('click', () => eventsHandler.trigger(Event.runInterval));

  document.getElementById('next')!
    .addEventListener('click', () => eventsHandler.trigger(Event.runOneCycle));

  document.getElementById('pause')!
    .addEventListener('click', () => eventsHandler.trigger(Event.pauseGame));

  document.getElementById('clear')!
    .addEventListener('click', () => eventsHandler.trigger(Event.clearBoard));
};
