import { EVENT_TYPES } from '../const.js';
import { generateMockData, getMockInfo } from '../mock/events.js';

export default class TripEventsModel {
  #destinations = [];
  #typesOffers = [];
  #events = [];

  constructor() {
    //! временно - скорее всего нужно сделать init()
    const { destinations, typesOffers, events } = generateMockData(EVENT_TYPES);
    this.#destinations = destinations;
    this.#typesOffers = typesOffers;
    this.#events = events;
  }

  get destinations() {
    return this.#destinations;
  }

  get typesOffers() {
    return this.#typesOffers;
  }

  get events() {
    return this.#events;
  }

  //! вычислить в TripInfoView
  get info() {
    return getMockInfo(this.#destinations); //! временно, потом собрать из событий
  }
}
