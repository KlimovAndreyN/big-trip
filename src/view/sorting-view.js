import AbstractView from '../framework/view/abstract-view.js';
import { createElementsTemplate } from '../utils/dom.js';
import { SORTING_TYPES, DEFAULT_SORTING_TYPE, DISABLE_SORTING_TYPES } from '../const.js';

const createSortingItemTemplate = (sortingType, activeSortingType, disableSortingTypes) => {
  const checked = (sortingType === activeSortingType) ? ' checked' : '';
  const disabled = (disableSortingTypes.includes(sortingType)) ? ' disabled' : '';

  return `<div class="trip-sort__item  trip-sort__item--${sortingType}">
  <input id="sort-${sortingType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortingType}"${checked}${disabled}>
  <label class="trip-sort__btn" for="sort-${sortingType}">${sortingType}</label>
</div>`;
};

const createSortingTemplate = (sortings, activeSorting, tripDisableSortings) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createElementsTemplate(sortings, createSortingItemTemplate, activeSorting, tripDisableSortings)}
</form>`;

export default class SortingView extends AbstractView {
  get template() {
    return createSortingTemplate(SORTING_TYPES, DEFAULT_SORTING_TYPE, DISABLE_SORTING_TYPES);
  }
}
