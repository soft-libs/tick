/*
 * Before write any tests for zones, read the following article:
 * https://moment.github.io/luxon/docs/manual/zones.html
 */
import assert from 'assert';
import { Zones } from '../zone';

describe('Main', () => {
    describe('FallbackLocale', () => {
        it('can detect local zone (Iran/Tehran)', () => {
            const z = Zones.local;
            assert.strictEqual(z.name, 'Local');
            assert.strictEqual(z.getOffset(new Date().valueOf()), 210);
            // assert.strictEqual(z.getName('long'), 'Iran Daylight Time');
            // assert.strictEqual(z.getName('long', Locales.find('fa-IR', {throwError : true})), 'وقت تابستانی ایران');
        });
    });
});