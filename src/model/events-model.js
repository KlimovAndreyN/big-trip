import { generateMockData } from '../mock/events.js';
import { EVENT_TYPES } from '../const.js';

export default class EventsModel {
  #destinations = new Map();
  #offers = new Map();
  #events = []; //! сделать Map, если будет поиск по id

  constructor() {
    //! временно - скорее всего нужно сделать init()
    const { destinations, offers, events } = generateMockData(EVENT_TYPES);
    destinations.forEach(({ id, name, description, pictures }) => {
      this.#destinations.set(id, { name, description, pictures });
    });
    offers.forEach(({ type, offers: typeOffers }) => {
      this.#offers.set(type, { name, offers: typeOffers });
    });

    this.#events = events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get events() {
    //! временно
    return [...this.#events];
  }
}
