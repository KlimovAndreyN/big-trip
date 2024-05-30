import Observable from '../framework/observable.js';
import { updateItemByKey, addItem, deleteItemByKey } from '../utils/utils.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #destinations = [];
  #offers = new Map();
  #events = [];

  constructor({ eventsApiService }) {
    super();

    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      this.#destinations = await this.#eventsApiService.destinations;

      const offers = await this.#eventsApiService.offers;
      offers.forEach(({ type, offers: typeOffers }) => {
        this.#offers.set(type, typeOffers);
      });

      const events = await this.#eventsApiService.events;
      this.#events = events.map(this.#adaptToClient);

    } catch (err) {
      this.#destinations = [];
      this.#offers = [];
      this.#events = [];
    }

    this._notify(UpdateType.INIT);
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get events() {
    return this.#events;
  }

  updateEvent(updateType, updatedEvent) {
    updateItemByKey(this.#events, updatedEvent);

    this._notify(updateType, updatedEvent);
  }

  addEvent(updateType, newEvent) {
    //! временно новый id
    const id = this.#events.length + 1;
    newEvent.id = id;

    addItem(this.#events, newEvent);

    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, event) {
    deleteItemByKey(this.#events, event);

    this._notify(updateType);
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      basePrice: event['base_price'],
      dateFrom: event['date_from'],
      dateTo: event['date_to'],
      isFavorite: event['is_favorite']
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
