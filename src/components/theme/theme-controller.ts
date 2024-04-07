import { themeConfig, ThemeParams, ThemeType } from './theme-config';
import { camelCaseToDash } from 'utils';
import { Event, eventsHandler } from 'components/events-controller';
import './theme-view';
import { Entity } from 'types';

export class ThemeController extends Entity {
  private _theme = ThemeType.light;
  private config = themeConfig;
  private rootElement = document.documentElement;

  constructor() {
    super();
    this.init();
  }

  public set theme(theme: ThemeType) {
    this._theme = theme;
    this.applyThemeConfig();

    eventsHandler.trigger(Event.onThemeChanged);
  }

  public getConfig(): ThemeParams {
    return this.config[this._theme];
  }

  public init(): void {
    this.applyThemeConfig();
    this.setListeners();
  }

  private applyThemeConfig(): void {
    const theme = this.config[this._theme];

    for (let key in theme) {
      const property = `--${camelCaseToDash(key)}`;
      const value = theme[key as keyof ThemeParams];

      this.rootElement.style.setProperty(property, value);
    }
  }

  private setListeners(): void {
    eventsHandler.register(Event.changeTheme, (theme: ThemeType) => {
      this.theme = theme;
    });
  }
}
