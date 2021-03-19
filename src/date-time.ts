import { Locale } from './locale';

const REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

function padNumber(value: number, length: number) {
    value.toString().slice(-length).padStart(length, '0');
}

/** DateTime values.  */
export interface DateTimeUnits {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    ms: number;
}

/** An abstract base class for all JS-Sugar DateTime classes.  */
export abstract class DateTime {
    private static _locales = new Array<Locale>();
    private static _defaultLocale: string;
    protected _date: DateTimeUnits;
    protected _isValid: boolean;
    private _locale: string;

    /** Get the locale of a DateTime, such 'en-GB'. */
    get locale(): string {
        return this._locale;
    }

    /** Returns whether the DateTime is valid. */
    get isValid(): boolean {
        return this._isValid;
    }

    /** Create a new DateTime. */
    constructor(date: DateTimeUnits, isValid: boolean, locale?: string) {
        this._date = date;
        this._isValid = isValid;
        this._locale = locale ?? DateTime.getDefaultLocale();
    }

    /** Adds a Locale. */
    static addLocale(locale: Locale): void {
        this._locales.push({ ...locale });

        if (this._locales.length === 0) {
            this._defaultLocale = locale.name;
        }
    }

    /** Finds a Locale by name. */
    static findLocale(localeName: string): Locale {
        const l = this._locales.find(x => x.name === localeName);
        return l ? { ...l } : null;
    }

    /** Sets the default Locale. */
    static setDefaultLocale(value: string) {
        this._defaultLocale = value;
    }

    /** Gets the default Locale name. */
    static getDefaultLocale(): string {
        return this._defaultLocale;
    }

    //#region Get
    /** Gets a unit value of this DateTime. */
    get(unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'ms'): number {
        return this._date[unit];
    }

    /** Get the year. */
    get year(): number {
        return this._date.year;
    }

    /** Get the month (1-12). */
    get month(): number {
        return this._date.month;
    }

    /** Get the day of the month (1 to 30). */
    get day(): number {
        return this._date.day;
    }

    /** Get the hour of the day (0 to 23). */
    get hour(): number {
        return this._date.hour;
    }

    /** Get the minute of the hour (0 to 59). */
    get minute(): number {
        return this._date.minute;
    }

    /** Get the second of the minute (0 to 59). */
    get second(): number {
        return this._date.second;
    }

    /** Get the millisecond of the second (0 to 999). */
    get ms(): number {
        return this._date.year;
    }

    /** Gets the ISO day of the week with (Monday = 1, ..., Sunday = 7). */
    abstract get weekDay(): number;

    /** Get the day of the week with respect of this DateTime's locale (locale aware) */
    get weekDayLocale(): number {
        throw new Error('Method not implemented.');
    }

    /** Gets the human readable weekday name (locale aware). */
    weekDayName(format: 'S' | 'L' = 'L'): string {
        throw new Error('Method not implemented.');
    }

    /** Gets the day of the year (1 to 366). */
    abstract get dayOfYear(): number;

    /** Get the week number of the week year (1 to 52). */
    abstract get weekNumber(): number;

    /** Returns the number of days in this DateTime's month. */
    abstract get daysInMonth(): number;

    /** Returns the number of days in this DateTime's year. */
    abstract get daysInYear(): number;

    /** Returns the number of weeks in this DateTime's year. */
    abstract get weeksInYear(): number;

    /** Returns true if this DateTime is in a leap year, false otherwise. */
    abstract get isInLeapYear(): boolean;

    /** Get the quarter. */
    abstract get quarter(): number;
    //#endregion GET

    //#region Manipulate
    /** Adds a period of time to this DateTime and returns the resulting DateTime. */
    abstract add(amounts: DateTimeUnits): DateTime;

    /** Subtracts a period of time from this DateTime and returns the resulting DateTime. */
    abstract subtract(amounts: DateTimeUnits): DateTime;

    /** Returns a new DateTime same as this DateTime but with time units set to zero (hour = minute = second = ms = 0)  */
    clearTime(): DateTime {
        throw new Error('Method not implemented.');
    }

    /** Clones this DateTime with overwritten values. */
    abstract clone(newValues?: Partial<DateTimeUnits>): DateTime;
    //#endregion

    //#region Query
    /** Returns whether a variable is a JS-Sugar DateTime or not. */
    isJsSugar(obj: any) {
        return obj instanceof DateTime;
    }

    /** Returns whether this DateTime is same as another DateTime. */
    isSame(dateTime: DateTime): boolean {
        const d1 = this._date;
        const d2 = dateTime.toObject();
        return d1.year === d2.year &&
            d1.month === d2.month &&
            d1.day === d2.day &&
            d1.hour === d2.hour &&
            d1.second === d2.second &&
            d1.minute === d2.minute &&
            d1.second === d2.second &&
            d1.ms === d2.ms;
    }

    /** Returns whether this DateTime is after another DateTime. */
    isAfter(dateTime: DateTime): boolean {
        const d1 = this._date;
        const d2 = dateTime.toObject();
        return d1.year > d2.year ||
            d1.month > d2.month ||
            d1.day > d2.day ||
            d1.hour > d2.hour ||
            d1.second > d2.second ||
            d1.minute > d2.minute ||
            d1.second > d2.second ||
            d1.ms > d2.ms;
    }

    /** Returns whether this DateTime is same or after another DateTime. */
    isSameOrAfter(dateTime: DateTime): boolean {
        return this.isAfter(dateTime) || this.isSame(dateTime);
    }

    /** Returns whether this DateTime is before another DateTime. */
    isBefore(dateTime: DateTime): boolean {
        const d1 = this._date;
        const d2 = dateTime.toObject();
        return d1.year < d2.year ||
            d1.month < d2.month ||
            d1.day < d2.day ||
            d1.hour < d2.hour ||
            d1.second < d2.second ||
            d1.minute < d2.minute ||
            d1.second < d2.second ||
            d1.ms < d2.ms;
    }

    /** Returns whether this DateTime is same or before another DateTime. */
    isSameOrBefore(dateTime: DateTime): boolean {
        return this.isBefore(dateTime) || this.isSame(dateTime);
    }

    /** Returns whether this DateTime is between the specified DateTimes. */
    isBetween(first: DateTime, second: DateTime): boolean {
        return this.isAfter(first) && this.isBefore(second);
    }
    //#endregion

    //#region Display + Convert
    /** Returns a string representation of this DateTime formatted according to the specified format string. */
    format(format: string): string {
        const matches: any = {
            Y: this.year,
            Y2: padNumber(this.year, 2),
            Y4: padNumber(this.year, 4),
            M: this.month,
            MM: padNumber(this.month, 2),
            // MMM: getShort(locale.monthsShort, $M, months, 3),
            // MMMM: getShort(months, $M),
            D: this.day,
            D2: padNumber(this.day, 2),
            // d: String(this.$W),
            // dd: getShort(locale.weekdaysMin, this.$W, weekdays, 2),
            // ddd: getShort(locale.weekdaysShort, this.$W, weekdays, 3),
            // dddd: weekdays[this.$W],
            H: this.hour,
            H2: padNumber(this.hour, 2),
            // h: get$H(1),
            // hh: get$H(2),
            // a: meridiemFunc($H, $m, true),
            // A: meridiemFunc($H, $m, false),
            m: this.minute,
            m2: padNumber(this.minute, 2),
            s: this.second,
            s2: padNumber(this.second, 2),
            ms: this.ms,
            ms3: padNumber(this.ms, 3),
            // SSS: Utils.s(this.$ms, 3, '0'),
            // Z: zoneStr // 'ZZ' logic below
        };

        return format.replace(REGEX_FORMAT, (match, $1) => $1 || matches[match]);
    }

    /** Returns an object with the values of this DateTime. */
    toObject(): DateTimeUnits {
        return { ...this._date };
    }

    /** Returns an Array with the values of this DateTime. */
    toArray(): number[] {
        const d = this._date;
        return [d.year, d.month, d.day, d.hour, d.minute, d.second, d.ms];
    }

    /** Returns the number of milliseconds since the minimum supported DateTime of this instance. */
    toTimestamp(): number[] {
        throw new Error('Method not implemented.');
    }

    /** Formats this DateTime to ISO8601 standard. */
    toIso(keepTimeZone = false): number[] {
        throw new Error('Method not implemented.');
    }
    //#endregion
}
