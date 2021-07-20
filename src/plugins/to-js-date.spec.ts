import assert from 'assert';
import { toJsDate } from './to-js-date';
import { DateTime } from '../main';

describe('Plugins', () => {
  describe('toJsDate', () => {
    it('toJsDate', () => {
      const dt = toJsDate(new DateTime());
      assert.strictEqual(dt instanceof Date, true);
    });
  });
});
