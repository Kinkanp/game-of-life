import { Event, eventsHandler } from '../events-controller';
import { ThemeType } from './theme-config';

function setListeners(): void {
  document.getElementById('theme-switcher')
    .addEventListener('click', (e: any) => {
      const theme = e.target.checked ? ThemeType.light : ThemeType.default;

      eventsHandler.trigger(Event.changeTheme, theme);
    });
  //
  // document.getElementById('theme2')
  //   .addEventListener('click', () => eventsHandler.trigger(Event.changeTheme, ThemeType.light))
}

setListeners();
