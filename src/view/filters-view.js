import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { FilterType, DEFAULT_FILTER_TYPE, DEFAULT_DISABLE_FILTER_TYPES } from '../const.js';
import { existFilteredEvents } from '../utils/filter.js';

const createFilterItemTemplate = (filter, _, activeFilter, disabledFilters) => {
  const checked = (filter === activeFilter) ? 'checked' : '';
  const disabled = (disabledFilters.includes(filter)) ? 'disabled' : '';

  return `<div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked} ${disabled}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
</div>`;
};

const createFiltersTemplate = (activeFilter, disabledFilters) => `<form class="trip-filters" action="#" method="get">
  ${createElementsTemplate(FilterType, createFilterItemTemplate, activeFilter, disabledFilters)}
</form>`;

export default class FiltersView extends AbstractView {
  #events = [];
  #onFilterChange = null;

  constructor(events, onFilterChange) {
    super();

    this.#events = events;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#onFormElementChange);
  }

  get template() {
    const disabledFilterTypes = (this.#events.length) ? this.#getDisabledFilters() : DEFAULT_DISABLE_FILTER_TYPES;

    return createFiltersTemplate(DEFAULT_FILTER_TYPE, disabledFilterTypes);
  }

  #getDisabledFilters() {
    //! проверить что в нужно месте вызываеться и нужно время
    const now = Date.now();
    const filters = Object.entries(FilterType).map(([, filter]) => filter); //! можно собрать и один раз в конструкторе, сделать в util

    return filters.filter((filter) => !existFilteredEvents(this.#events, filter, now));
  }

  #onFormElementChange = (evt) => {
    this.#onFilterChange(evt.target.value);
  };
}
