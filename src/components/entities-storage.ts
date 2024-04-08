import { Grid } from './grid/grid';
import { GridCells } from './grid-cell/grid-cells';
import { Drawer } from './drawer';
import { ThemeController } from './theme/theme-controller';
import { setupCanvas } from './canvas-setup';
import { FiguresPanel } from './figures-panel/figures-panel';
import { FigurePlacer } from './figure-placer';

export class EntitiesStorage {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public grid: Grid;
  public gridCells: GridCells
  public drawer: Drawer;
  public theme: ThemeController;
  public panel: FiguresPanel;
  public figurePlacer: FigurePlacer;

  public createEntities(): void {
    const container = document.getElementById('canvas-container');
    const { canvas, ctx } = setupCanvas(container);
    const { width, height } = canvas;

    this.canvas = canvas;
    this.ctx = ctx;

    this.panel = new FiguresPanel();
    this.theme = new ThemeController();
    this.grid = new Grid({ width, height, ctx, theme: this.theme });

    this.grid.init();

    this.gridCells = new GridCells({
      grid: this.grid.grid,
      ctx,
      theme: this.theme
    });

    this.figurePlacer = new FigurePlacer({ grid: this.grid.grid });
    this.drawer = new Drawer(canvas, this.grid, ctx, this.gridCells);
    this.drawer.init();
    this.theme.init();
    this.panel.init();

    (window as any).test = this;
  }
}
