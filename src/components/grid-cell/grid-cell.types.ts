import { IGrid, IGridCell } from 'components/grid/grid-types';
import { ThemeController } from '../theme/theme-controller';

export interface Params {
  grid: IGrid;
  ctx: CanvasRenderingContext2D;
  theme: ThemeController;
}

export interface GroupedCells {
  toDestroy: {
    [key: string]: IGridCell;
  };
  toRevive: {
    [key: string]: IGridCell;
  };
}
