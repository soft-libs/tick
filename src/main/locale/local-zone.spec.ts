/*
 * Before write any tests for zones, read the following article:
 * https://moment.github.io/luxon/docs/manual/zones.html
 */
import assert from 'assert';
import { Zones } from '../zone';

describe('Zone', () => {
    describe('LocalZone', () => {
        it('can detect local zone (Iran/Tehran)', () => {
            const z = Zones.local;
            assert.strictEqual(z.name, 'Local');
            assert.strictEqual(z.getOffset(new Date().valueOf()), 270);
            // assert.strictEqual(z.getName('long'), 'Iran Daylight Time');
            // assert.strictEqual(z.getName('long', Locales.find('fa-IR', {throwError : true})), 'وقت تابستانی ایران');
        });
    });
});