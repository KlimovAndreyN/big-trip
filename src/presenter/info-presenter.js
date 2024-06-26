import { render, remove, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';
import { getTripInfo } from '../utils/event.js';

export default class InfoPresenter {
  #containerElement = null;
  #eventsModel = null;
  #infoComponent = null;

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  init() {
    const { events, destinations, offers } = this.#eventsModel;

    remove(this.#infoComponent);

    if (events.length) {
      this.#infoComponent = new InfoView({ tripInfo: getTripInfo(events, destinations, offers) });
      render(this.#infoComponent, this.#containerElement, RenderPosition.AFTERBEGIN);
    }
  }
}
