import { createElement } from '../render.js';
import { createElementsTemplate, capitalizeFirstLetter } from '../utils.js';

const createTypeItemTemplate = ({ id, type }) => `<div class="event__type-item">
  <input id="${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type}" for="${id}">${capitalizeFirstLetter(type)}</label>
</div>`;

const createTypeListTemplate = (types) => `<div class="event__type-list">
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${createElementsTemplate(types, createTypeItemTemplate)}
  </fieldset>
</div>`;

const createDestinationOptionTemplate = (destinationName) => `<option value="${destinationName}"></option>`;

const createDestinationDatalistTemplate = (destinationNames) => `<datalist id="destination-list-1">
    ${createElementsTemplate(destinationNames, createDestinationOptionTemplate)}
</datalist>`;

//! без оферов нужно убрать блок блок!
const createOfferTemplate = ({ id, name, title, price, checked }) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${name}" ${(checked) ? 'checked' : ''}>
    <label class="event__offer-label" for="${id}">
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;

const createPhotoTemplate = ({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createEventFormTemplate = (event, types, destinationNames, offers) => {
  const { /*id,*/ type, eventOffers, destination, basePrice } = event;

  //const destination = { pictures: [], description: '' };
  const {
    pictures,
    description //! без описание нужно убрать весь блок!
  } = destination;

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${createTypeListTemplate(types)}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeFirstLetter(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          ${createDestinationDatalistTemplate(destinationNames)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createElementsTemplate(offers, createOfferTemplate)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createElementsTemplate(pictures, createPhotoTemplate)}
              </div>
            </div>
          </section>
        </section>
      </form>
      <li>`;
};

export default class EventFormView {
  constructor(event, types, destinationNames, offers) {
    this.event = event;
    this.types = types;
    this.destinationNames = destinationNames;
    this.offers = offers;
  }

  getTemplate() {
    const { event, types, offers, destinationNames } = this;

    return createEventFormTemplate(event, types, destinationNames, offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
