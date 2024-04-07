import { GameController } from './game-controller';
import { setControlListeners } from './control-panel';
import { EntitiesStorage } from './entities-storage';
import { FigurePlacer } from './figure-placer';

const entitiesStorage = new EntitiesStorage();
const gameController = new GameController(entitiesStorage);

entitiesStorage.createEntities();
gameController.runOneCycle();
setControlListeners();

// const figurePlacer = new FigurePlacer({ grid: grid.grid, width, height });
// const figuresSelector = new FiguresSelector(figures as any);
// const f = transformArrayToFigure(figures[1]);
// const f = transformArrayToFigure(figures[figures.length - 6]);
// var a = ['000000000000000000', '0000000100001', '000001101111011', '0000000100001'];
// const f = transformArrayToFigure(a);
// figurePlacer.place(f);


