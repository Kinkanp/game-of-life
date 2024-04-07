import { IGrid } from './grid/grid-types';
import { CellType } from './constants';

export type Figure = CellType[][];

interface Params {
  width: number;
  height: number;
  grid: IGrid;
}

export class FigurePlacer {
  private grid: IGrid;
  private width: number;
  private height: number;

  constructor({ width, height, grid }: Params) {
    this.grid = grid;
    this.width = width;
    this.height = height;
  }

  public place(figure: Figure): void {
    const centerI = Math.floor(this.grid[0].length / 2);
    const centerJ = Math.floor(this.grid.length / 2);

    const figureLeftI = Math.max(...figure.map(row => row.length));
    const figureLeftJ = figure.length;

    const offsetI = Math.floor(figureLeftI / 2);
    const offsetJ = Math.floor(figureLeftJ / 2);

    const startI = centerJ - offsetI;
    const startJ = centerI - offsetJ;

    for (let i = startI; i < startI + figureLeftI; i++) {
      for (let j = startJ; j < startJ + figureLeftJ; j++) {
        const figureI = i - startI;
        const figureJ = j - startJ;

        this.grid[i][j].type = figure[figureJ][figureI] || CellType.dead;
      }
    }
  }
}
