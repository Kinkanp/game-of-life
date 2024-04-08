import { GameController } from './game-controller';
import { setControlListeners } from './control-panel';
import { EntitiesStorage } from './entities-storage';

const entitiesStorage = new EntitiesStorage();
const gameController = new GameController();

entitiesStorage.createEntities();

gameController.setup(entitiesStorage);
setControlListeners();

gameController.runOneCycle();

