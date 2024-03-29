import assert from 'assert';
import { GregorianCalendar } from '../calendars/gregorian';
import { Calendars, DateTime } from '../main';
import { fromJsDate } from './from-js-date';

describe('Plugins', () => {
  describe('fromJsDate', () => {
    before(function () {
      Calendars.add(new GregorianCalendar('gregorian'));
    });

    it('can create a DateTime object from a javascript Date', () => {
      const d1 = new Date();
      const d2 = fromJsDate(d1);
      const d3 = fromJsDate(d1);

      // const dt = new DateTime({
      //   zone: 'Asia/Tokyo',
      //   locale: 'ro',
      // });
      // const d = fromJsDate(new Date(), { zone: 'Asia/Tokyo', locale: 'ro' });
      // assert.strictEqual(dt.locale, d.locale);
      // assert.strictEqual(dt.zone, d.zone);
      // assert.strictEqual(dt.calendar, d.calendar);
    });
  });
});
