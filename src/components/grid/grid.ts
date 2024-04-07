import { CellType, Config } from '../constants';
import { IGrid, Params } from './grid-types';
import { ThemeController } from '../theme/theme-controller';
import { Entity } from '../../types';

export class Grid extends Entity {
  public grid: IGrid;

  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private theme: ThemeController;
  private rowsCount: number;
  private columnsCount: number;

  private offset = 0.5;

  constructor({ width, height, ctx, theme }: Params) {
    super();
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.theme = theme;

    this.init();
  }

  public draw() {
    const theme = this.theme.getConfig();

    this.ctx.beginPath();
    this.ctx.strokeStyle = theme.gridLines;

    for (let i = 0; i < this.columnsCount; i++) {
      this.ctx.moveTo(i * Config.cellSize + this.offset, 0);
      this.ctx.lineTo(i * Config.cellSize + this.offset, this.height);
    }

    this.ctx.moveTo(this.width, 0);
    this.ctx.lineTo(this.width, this.height);

    for (let i = 0; i < this.rowsCount; i++) {
      this.ctx.moveTo(0, i * Config.cellSize + this.offset);
      this.ctx.lineTo(this.width, i * Config.cellSize + this.offset);
    }

    this.ctx.moveTo(0, this.height);
    this.ctx.lineTo(this.width, this.height);

    this.ctx.stroke();
  }

  public init(): void {
    this.calculateGridSize();
    this.grid = this.generate();
  }

  private generate(): IGrid {
    return Array.from({ length: this.columnsCount }, (_, i) => {
      return Array.from({ length: this.rowsCount }, (_, j) => {
        return {
          type: CellType.dead,
          x: i * Config.cellSize + this.offset,
          y: j * Config.cellSize + this.offset,
          i,
          j
        };
      });
    });
  }

  private calculateGridSize() {
    this.rowsCount = this.height / Config.cellSize;
    this.columnsCount = this.width / Config.cellSize;
  }
}
