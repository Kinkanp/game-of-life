import { Grid } from './grid/grid';
import { Config } from './constants';
import { GridCells } from './grid-cell/grid-cells';
import { IGridCell } from './grid/grid-types';
import { Entity } from '../types';

export class Drawer extends Entity {
  private lastActiveCell: IGridCell;
  private isMouseDown = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private grid: Grid,
    private ctx: CanvasRenderingContext2D,
    private gridCells: GridCells
  ) {
    super();
  }

  public init() {
    this.setListeners();
  }

  private setListeners(): void {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;

      this.redrawCells(e)
      this.grid.draw();
    });
    this.canvas.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      this.lastActiveCell = null;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isMouseDown) {
        this.redrawCells(e)
        this.grid.draw();
      }
    });

    document.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      this.lastActiveCell = null;
    });
  }

  private redrawCells(event: MouseEvent): void {
    const { x, y } = this.getMouseCoordsOnCanvas(event.pageX, event.pageY);

    const cell = this.getClickedCell(x, y);

    if (this.lastActiveCell === cell || !cell) {
      return;
    }

    this.lastActiveCell = cell;
    this.gridCells.toggleCellType(cell);
    this.gridCells.drawCell(cell);
  }

  private getMouseCoordsOnCanvas(pageX: number, pageY: number): { x: number, y: number } {
    const canvasOffsetX = this.canvas.offsetLeft;
    const canvasOffsetY = this.canvas.offsetTop;

    return { x: pageX - canvasOffsetX, y: pageY - canvasOffsetY };
  }

  private getClickedCell(x: number, y: number): IGridCell {
    const size = Config.cellSize;
    const i = (x - x % size) / size;
    const j = (y - y % size) / size;

    return this.grid.grid[i]?.[j];
  }
}
