import assert from 'assert';
import { DateTime, Calendars } from '../main';
import { GregorianCalendar } from '../calendars/gregorian';
import { isSame } from '../plugins/is-same';
import { setMonth } from '../plugins/set-month';

describe('Plugins', () => {
  describe('set-month', () => {
    before(function () {
      Calendars.add(new GregorianCalendar('gregorian'));
    });
    it('set month', () => {
      const dt = new DateTime(2018, 7, 31, 12, 34, 23, 4);
      const month = 2;

      const newDate = setMonth(dt, month);

      console.log(newDate.year + ' ' + newDate.month + ' ' + newDate.day);
      assert.strictEqual(
        true,
        isSame(newDate, new DateTime(2018, 2, 28, 12, 34, 23, 4))
      );
    });
  });
});
