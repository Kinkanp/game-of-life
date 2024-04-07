import { CellType } from 'components/constants';
import { ThemeController } from '../theme/theme-controller';

export interface Params {
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    theme: ThemeController
}

export type IGrid = IGridCell[][];

export interface IGridCell {
    type: CellType
    x: number;
    y: number;
    i: number;
    j: number;
}

