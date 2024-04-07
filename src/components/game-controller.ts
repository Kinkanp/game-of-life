import { Event, eventsHandler } from './events-controller';
import { EntitiesStorage } from './entities-storage';

export class GameController {
  private cycleIntervalId: number;
  private shouldValidateCells = false;
  private updateInterval = 75;

  constructor(private entities: EntitiesStorage) {
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

  private registerEvents(): void {
    eventsHandler.register(Event.clearBoard, () => this.clearBoard());
    eventsHandler.register(Event.pauseGame, () => this.pause());
    eventsHandler.register(Event.runOneCycle, () => this.runOneCycle());
    eventsHandler.register(Event.runInterval, () => this.runInterval());
    eventsHandler.register(Event.onThemeChanged, () => this.redrawBoard());
  }
}
