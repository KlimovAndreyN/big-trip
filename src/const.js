const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_NEW_EVENT = {
  type: EVENT_TYPES[5],
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: null,
  destanation: null,
  destanationInfo: null,
  typeOffers: []
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;
const DEFAULT_DISABLE_FILTER_TYPES = [FilterType.FUTURE, FilterType.PAST];

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const sortingTypeLabelText = {
  [SortingType.DAY]: SortingType.DAY,
  [SortingType.EVENT]: SortingType.EVENT,
  [SortingType.TIME]: SortingType.TIME,
  [SortingType.PRICE]: SortingType.PRICE,
  [SortingType.OFFER]: 'offers'
};

const DEFAULT_SORTING_TYPE = SortingType.DAY;
const DISABLE_SORTING_TYPES = [SortingType.EVENT, SortingType.OFFER];

const MessageType = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

const DateFormat = {
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  SHORT_DATE_TIME_FLATPICKR: 'd/m/y H:i',
  DATE: 'YYYY-MM-DD',
  MONTH_DAY: 'MMM DD',
  DAY_MONTH: 'DD MMM',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  TIME: 'HH:mm'
};

const DEFAULT_FLATPICKR_CONFIG = {
  enableTime: true,
  'time_24hr': true, // в настройках  flatpickr назваеться time_24hr, а linter ругаеться на camelCase: "error  Identifier 'time_24hr' is not in camel case  camelcase"
  dateFormat: DateFormat.SHORT_DATE_TIME_FLATPICKR,
};

export {
  EVENT_TYPES,
  DEFAULT_NEW_EVENT,
  FilterType,
  DEFAULT_FILTER_TYPE,
  DEFAULT_DISABLE_FILTER_TYPES,
  SortingType,
  sortingTypeLabelText,
  DEFAULT_SORTING_TYPE,
  DISABLE_SORTING_TYPES,
  MessageType,
  DateFormat,
  DEFAULT_FLATPICKR_CONFIG
};
