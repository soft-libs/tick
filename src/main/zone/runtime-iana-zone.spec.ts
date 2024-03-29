import assert from 'assert';
import { Calendars } from '../calendar';
import { PersianCalendar } from '../../calendars/persian';
import { GregorianCalendar } from '../../calendars/gregorian';
import { RuntimeIANAZone } from '.';
import { DateTime } from '../date-time';


describe('Main', () => {
  describe('RuntimeIANAZone', function () {
    before(function () {
      Calendars.add(new PersianCalendar('persian'));
      Calendars.add(new GregorianCalendar('gregorian'));
    });


    it('can resolve UTC zone', () => {
      const z1 = new RuntimeIANAZone('UTC');
      const z2 = new RuntimeIANAZone('utc');
      assert.strictEqual(z1.getCurrentOffset(), 0);
      assert.strictEqual(z2.getCurrentOffset(), 0);
    });
    
    it('can resolve Asia/Tehran zone', () => {
      const z = new RuntimeIANAZone('Asia/Tehran');
      assert.strictEqual(z.getCurrentOffset(), 3 * 60 + 30); // Asia/Tehran offset: 03:30
    });   

    it('can resolve america/washington zone', () => {
      const z = new RuntimeIANAZone('America/Adak');
      var d = new DateTime();
      assert.strictEqual(z.getOffset(d.ts), -540); // Asia/Tehran offset: 03:30
      assert.strictEqual(z.getCurrentOffset(), -540); // Asia/Tehran offset: 03:30
      console.log(z.getOffset(d.ts));
      console.log(z.getCurrentOffset());
    });   
  });
});
