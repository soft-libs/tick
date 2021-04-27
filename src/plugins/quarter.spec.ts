import assert from 'assert';
import { quarter } from './quarter';
import moment from 'moment';
import { fromJsDate } from './from-js-date';
import { DateTime } from '../date-time';
import { Calendar } from '../calendar';

describe('Plugins', () => {
  describe('quarter', () => {
    it('quarter', () => {
      for (let index = 0; index < 100; index++) {
        const start = new DateTime(1970, 0, 1);
        const end = new DateTime();

        const randdt = new DateTime(
          start.ms + Math.random() * (end.ms - start.ms)
        );
        let r = new Date(2013, 4, 1);
        let rr = fromJsDate(r).subtract({ ms: 1 });
        let t1 = quarter(rr);
        let t2 = moment(r).quarter();
        assert.strictEqual(
          quarter(randdt),
          moment({
            year: randdt.year,
            month: randdt.month,
            day: randdt.day,
          }).quarter()
        );
      }
    });

    it('subtract one ms', function () {
      const dt = new DateTime(2013, 4, 1, 0, 0, 0, 0);
      const dt2 = dt.subtract({
        ms: 1,
      });
      const r = new Date(dt2.ts);
      // const dt3 = dt2.calendar.getUnits(dt2.ts);
      // const f = fromObject(dt3)
    });
  });
});
