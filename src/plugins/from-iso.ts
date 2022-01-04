import { ZoneSpecifier, Calendars, LocaleSpecifier, DateTime } from '../main';
import { fromJsDate } from './from-js-date';

/** 
 * Creates a DateTime from an ISO 8601 Date string
 * @public
 */
export function fromIso(date: string, options?: { zone?: ZoneSpecifier, locale?: LocaleSpecifier }) {
    const c = Calendars.findByType('gregory')[0];
    if (!c) {
        throw Error('No gregorian calendar found.');
    }

    const d = new Date(Date.parse(date));
    return fromJsDate(d, { zone: options?.zone, locale: options?.locale });
}
