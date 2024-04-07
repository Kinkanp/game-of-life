export enum ThemeType {
  default,
  light
}

export interface ThemeParams {
  gridLines: string;
  cellAlive: string;
  cellDead: string;
  mainColor: string;
  buttonBorderColor: string;
}

export type ThemeConfig = Record<ThemeType, ThemeParams>

export const themeConfig: ThemeConfig = {
  [ThemeType.default]: {
    mainColor: '#000',
    gridLines: '#333',
    cellDead: '#000',
    cellAlive: 'green',
    buttonBorderColor: '#fff'
  },
  [ThemeType.light]: {
    mainColor: '#043565',
    gridLines: '#000',
    cellDead: '#02394A',
    cellAlive: '#5158BB',
    buttonBorderColor: '#000'
  }
};
