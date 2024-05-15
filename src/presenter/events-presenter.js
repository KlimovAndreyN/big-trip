import { render } from '../framework/render.js';
import EventPresenter from './event-presenter.js';
import EventsListView from '../view/events-list-view.js';
import MessageView from '../view/message-view.js';
import { MessageType } from '../const.js';

export default class EventsPresenter {
  #containerElement = null;
  #eventsModel = null;

  #events = null;

  #eventPresenters = new Map();
  #activeEventPresenter = null;

  #eventsListComponent = new EventsListView();

  constructor({ containerElement, eventsModel }) {
    this.#containerElement = containerElement;
    this.#eventsModel = eventsModel;
  }

  //? а деструкторы нужны? TaskPresenter ->destroy() { remove(this.#taskComponent); remove(this.#taskEditComponent); }

  init(events) {
    //! временно
    this.#events = events;

    this.#renderEventsList();
  }

  #renderEventsList() {
    if (this.#events.size) {
      this.#events.forEach((event) => this.#renderEventItem(event));
      render(this.#eventsListComponent, this.#containerElement);
    } else {
      render(new MessageView(MessageType.NEW_EVENT), this.#containerElement);
    }
  }

  #renderEventItem(event) {
    const eventPresenter = new EventPresenter({
      containerElement: this.#eventsListComponent.element,
      eventsModel: this.#eventsModel,
      onAfterEditClick: this.#onAfterEventEditClick,
      onAfterFormClose: this.#onAfterEventFormClose,
      onEventChange: this.#onEventChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #onAfterEventEditClick = (eventPresenter) => {
    if (this.#activeEventPresenter) {
      this.#activeEventPresenter.closeForm();
    }

    this.#activeEventPresenter = eventPresenter;
  };

  #onAfterEventFormClose = () => {
    this.#activeEventPresenter = null;
  };

  #onEventChange = (updatedEvent) => {
    const { id } = updatedEvent;
    this.#events.set(id, updatedEvent);
    this.#eventPresenters.get(id).init(updatedEvent);
  };
}
