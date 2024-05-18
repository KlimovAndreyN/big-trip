import { FilterType } from '../const.js';

//! у каждого фильтра свое сообщение в ТЗ поискать

//! сделать (events) => {} и для проверок и для фильтрации, сортивки!
//! применить dayjs isBefore isAfter
//! глянуть в ТЗ нужно ли учитывать весь день, т.е. <= 01.01.2000 23:59:59 или < 02.01.2000 00:00.00
const tripDatePeriodChecks = { //! trip -> events?
  [FilterType.EVERYTHING]: () => true,
  [FilterType.FUTURE]: (dateFrom, _, date) => (dateFrom > date),
  [FilterType.PRESENT]: (dateFrom, dateTo, date) => ((dateFrom <= date) && (dateTo >= date)),
  [FilterType.PAST]: (_, dateTo, date) => (dateTo < date),
};

const existFilteredEvents = (events, filter, now) => {
  const tripDatePeriodCheck = tripDatePeriodChecks[filter];
  return [...events.values()].some((event) => {
    const { dateFrom, dateTo } = event;

    return tripDatePeriodCheck(dateFrom, dateTo, now);
  });
};

export { existFilteredEvents };
