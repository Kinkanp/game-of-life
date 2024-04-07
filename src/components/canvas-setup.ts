import { Config } from './constants';

export function setupCanvas(container: HTMLElement): { canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D } {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  canvas.width = setCanvasSize(container.offsetWidth);
  canvas.height = setCanvasSize(container.offsetHeight);

  return { canvas, ctx };
}

function setCanvasSize(size: number) {
  const canvasSize = Math.round(size);
  const roundTo = Config.cellSize;
  const diff = canvasSize % roundTo;

  if (diff === 0) {
    return canvasSize;
  }

  return canvasSize - diff;
}
