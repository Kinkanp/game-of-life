import { Event, eventsHandler } from './events-controller';
import { EntitiesStorage } from './entities-storage';
import { Figure } from './figure-placer';
import { figures } from '../figures';
import { transformArrayToFigure } from './figures/figures';

export class GameController {
  private cycleIntervalId: number;
  private shouldValidateCells = false;
  private updateInterval = 75;
  private entities: EntitiesStorage;

  public setup(entitiesStorage: EntitiesStorage): void {
    this.entities = entitiesStorage;
    this.registerEvents();
  }

  public clearBoard(): void {
    this.entities.ctx.clearRect(0, 0, this.entities.canvas.width, this.entities.canvas.height);

    this.entities.gridCells.resetAndRedraw();
    this.entities.grid.draw();
  }

  public pause(): void {
    if (this.cycleIntervalId) {
      clearInterval(this.cycleIntervalId);
    }
  }

  public runInterval(): void {
    if (this.cycleIntervalId) {
      clearInterval(this.cycleIntervalId);
    }

    this.cycleIntervalId = window.setInterval(() => {
      this.shouldValidateCells = true;
      this.runOneCycle();
    }, this.updateInterval);
  }

  public runOneCycle() {
    this.entities.ctx.clearRect(0, 0, this.entities.canvas.width, this.entities.canvas.height);

    this.shouldValidateCells = true;
    this.entities.gridCells.draw({
      shouldValidateCells: this.shouldValidateCells,
    });

    this.entities.grid.draw();
  }

  private resizeCanvas(): void {
    console.log('resizing...');
  }

  private redrawBoard(): void {
    this.entities.gridCells.draw({ shouldValidateCells: false });
    this.entities.grid.draw();
  }

  private onFigureSelected(figure: Figure): void {
    console.log('[LOG] figure selected', figure)
    this.pause();
    this.clearBoard();
    this.entities.figurePlacer.place(figure);
    this.redrawBoard();
  }

  private registerEvents(): void {
    eventsHandler.register(Event.clearBoard, () => this.clearBoard());
    eventsHandler.register(Event.pauseGame, () => this.pause());
    eventsHandler.register(Event.runOneCycle, () => this.runOneCycle());
    eventsHandler.register(Event.runInterval, () => this.runInterval());
    eventsHandler.register(Event.onThemeChanged, () => this.redrawBoard());
    eventsHandler.register(Event.figureSelected, (figure: Figure) => this.onFigureSelected(figure));
  }
}
