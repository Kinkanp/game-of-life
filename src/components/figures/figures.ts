import { Figure } from '../figure-placer';
import { CellType } from '../constants';

export function transformArrayToFigure(figure: string[]): Figure {
  return figure.map((row) => {
    const cells = row.split("");

    return cells.map((cell) => +cell === CellType.live ? CellType.live : CellType.dead);
  });
}
