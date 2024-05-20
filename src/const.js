const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DEFAULT_EVENT = {
  id: null,
  type: EVENT_TYPES[0],
  basePrice: 100,
  dateFrom: null,
  dateTo: null,
  isFavorite: false,
  offers: [],
  destanation: null
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;
const DEFAULT_DISABLE_FILTER_TYPE = [FilterType.FUTURE, FilterType.PAST];

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const DEFAULT_SORTING_TYPE = SortingType.DAY;
const DISABLE_SORTING_TYPES = [SortingType.EVENT, SortingType.OFFERS];

const MessageType = {
  NEW_EVENT: 'Click New Event to create your first point',
  LOADING: 'Loading...',
  FAILEAD: 'Failed to load latest route information'
};

export {
  EVENT_TYPES,
  DEFAULT_EVENT,
  FilterType,
  DEFAULT_FILTER_TYPE,
  DEFAULT_DISABLE_FILTER_TYPE,
  SortingType,
  DEFAULT_SORTING_TYPE,
  DISABLE_SORTING_TYPES,
  MessageType
};
