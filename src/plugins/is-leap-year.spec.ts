import assert from 'assert';
import { isLeapYear } from './is-leap-year';
import moment from 'moment';
import { fromJsDate } from './from-js-date';

describe('Plugins', () => {
  describe('is-leap-year', () => {
    it('can compare is-leap-year with the same function at moment', () => {
      for (let index = 0; index < 10000; index++) {
        const start = new Date(1970, 0, 1);
        const end = new Date();

        const randd = new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
        assert.strictEqual(isLeapYear(fromJsDate(randd)), moment([randd.getFullYear()]).isLeapYear());
      }
    });
  });
});
