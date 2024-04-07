import { CellType, Config } from '../constants';
import { IGrid, IGridCell } from '../grid/grid-types';
import { GroupedCells, Params } from './grid-cell.types';
import { ThemeController } from '../theme/theme-controller';

export class GridCells {
  private grid: IGrid;
  private ctx: CanvasRenderingContext2D;
  private theme: ThemeController;

  constructor({ grid, ctx, theme }: Params) {
    this.grid = grid;
    this.ctx = ctx;
    this.theme = theme;
  }

  public draw({ shouldValidateCells }: { shouldValidateCells: boolean }) {
    if (shouldValidateCells) {
      const cells = this.getGroupedCells();

      this.updateCells(cells);
    }

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.drawCell(this.grid[i][j]);

        // this.ctx.fillText(`${i};${j}`, x, y);
        // const { x, y } = this.grid[i][j];
        // if (this.grid[i][j].type) {
          // this.ctx.fillText(`${i};${j}`, x, y);
          // this.ctx.fillStyle = '#000';
          // this.ctx.font = '20px serif';
          // console.log('i', i, 'j', j, 'type', this.grid[i][j].type);
        // }
      }
    }
  }

  public drawCell({ x, y, type }: IGridCell) {
    const theme = this.theme.getConfig();

    switch (type) {
      case CellType.live:
        this.ctx.fillStyle = theme.cellAlive;
        this.ctx.fillRect(x, y, Config.cellSize, Config.cellSize);

        break;

      case CellType.dead:
        this.ctx.fillStyle = theme.cellDead;
        this.ctx.fillRect(x, y, Config.cellSize, Config.cellSize);

        break;
    }
  }

  public toggleCellType({ i, j }: IGridCell): void {
    const cell = this.grid[i]?.[j];

    if (!cell) {
      return;
    }

    const type = cell.type === CellType.dead ? CellType.live : CellType.dead;
    this.setCellType(cell, type);
  }

  public resetAndRedraw(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const cell = this.grid[i][j];

        this.setCellType(cell, CellType.dead);
        this.drawCell(cell);
      }
    }
  }

  public setCellType(cell: IGridCell, type: CellType): void {
    cell.type = type;
  }

  private getGroupedCells(): GroupedCells {
    const cells: GroupedCells = { toDestroy: {}, toRevive: {} };

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const around = {
          centerTop: [i, j - 1],
          topRight: [i + 1, j - 1],
          centerRight: [i + 1, j],
          bottomRight: [i + 1, j + 1],
          bottomCenter: [i, j + 1],
          bottomLeft: [i - 1, j + 1],
          centerLeft: [i - 1, j],
          topLeft: [i - 1, j - 1],
        };
        const current = this.grid[i][j];
        const neighbors = Object
          .values(around)
          .map(([i, j]) => this.grid[i] && this.grid[i][j])
          .filter(Boolean);

        const isCurrentDead = current.type === CellType.dead;
        const isCurrentAlive = current.type === CellType.live;
        const liveCells = neighbors.filter(({ type }) => type === CellType.live);

        if (isCurrentAlive && (liveCells.length < 2 || liveCells.length > 3)) {
          cells.toDestroy[`${i}-${j}`] = current;

          continue;
        }

        if (isCurrentDead && liveCells.length === 3) {
          const { i: i2, j: j2 } = current;

          cells.toRevive[`${i2}-${j2}`] = this.grid[i2][j2];
        }
      }
    }

    return cells;
  }

  private updateCells({ toDestroy, toRevive }: GroupedCells) {
    for (let cell in toDestroy) {
      toDestroy[cell].type = CellType.dead;
    }

    for (let cell in toRevive) {
      toRevive[cell].type = CellType.live;
    }
  }
}
