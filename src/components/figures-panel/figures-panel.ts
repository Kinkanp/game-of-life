import { Entity } from '../../types';
import { figures } from '../../figures';
import { Event, eventsHandler } from '../events-controller';
import { transformArrayToFigure } from '../figures/figures';

interface FiguresList {
  name: string;
  data: string[];
}

export class FiguresPanel implements Entity {
  public init() {
    const list = this.createList();
    this.appendList(list);
  }

  private createList(): FiguresList[] {
    return figures.map((data, index) => ({ data, name: `${index}` }))
  }

  private appendList(list: FiguresList[]): void {
    const container = document.getElementById('figures-list');
    const fragment = document.createDocumentFragment();

    list.forEach(item => {
      const element = document.createElement('p');
      element.innerText = item.name;
      element.addEventListener('click', () => {
        eventsHandler.trigger(Event.figureSelected, transformArrayToFigure(item.data));
      })

      fragment.append(element);
    });

    container.appendChild(fragment);
  }
}
