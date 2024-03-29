/**
 * @category Calendar
 * @module Calendar
 */

// tslint:disable: variable-name
// tslint:disable: member-ordering
import {
  DateTimeUnits,
  getCalendarTimestamp,
  TimeUnits,
  MS_PER_DAY,
  MS_PER_HOUR,
  MS_PER_MINUTE,
  MS_PER_SECOND,
  throwInvalidParam,
  MAX_YEAR,
  vType,
} from '../common';

function add(time: number, value: number, scale: number): number {
  const millis: number = value * scale;
  const ticks: number = time + millis;
  return ticks;
}

function addMs(time: number, milliseconds: number): number {
  return add(time, milliseconds, 1);
}

function addSeconds(time: number, seconds: number): number {
  return add(time, seconds, MS_PER_SECOND);
}

function addMinutes(time: number, minutes: number): number {
  return add(time, minutes, MS_PER_MINUTE);
}

function addHours(time: number, hours: number): number {
  return add(time, hours, MS_PER_HOUR);
}

function addDays(time: number, days: number): number {
  return add(time, days, MS_PER_DAY);
}

function getFirstDayWeekOfYear(
  firstDayOfWeek: number,
  dayOfYear: number,
  weekDay: number
): number {
  dayOfYear = dayOfYear - 1;
  const dayForJan1 = weekDay - (dayOfYear % 7);
  const offset = (dayForJan1 - firstDayOfWeek + 14) % 7;
  return Math.trunc((dayOfYear + offset) / 7) + 1;
}

function ms(time: number): number {
  return time % 1000;
}

function second(time: number): number {
  return Math.trunc((time / MS_PER_SECOND) % 60);
}

function minute(time: number): number {
  return Math.trunc((time / MS_PER_MINUTE) % 60);
}

function hour(time: number): number {
  return Math.trunc((time / MS_PER_HOUR) % 24);
}

// TODO: This function is exported from library, it should be private.
/** 
 * @internal
 */
export function getTimeUnits(time: number): TimeUnits {
  return {
    hour: hour(time),
    minute: minute(time),
    second: second(time),
    ms: ms(time),
  };
}

/**
 * A base class for all calendars.
 * @public
 */
export abstract class Calendar {
  #id: string;
  #type: string;

  /**
   * Calendar's ID.
   */
  get id() {
    return this.#id;
  }

  /**
   * Calendar's type (Gregorian, Chiness, Persian, Islamic, ...).
   * It is possible that you have multiple calendars with the same type and different ID's (multiple implementations for a specific calendar).
   */
  get type() {
    return this.#type;
  }

  constructor(id: string, type: string) {
    vType(id, 'string', true);
    vType(type, 'string', true);
    this.#id = id;
    this.#type = type;
  }

  /** 
   * Adds a period of time to a timestamp and returns the resulting timestamp.
   * @public
   */
  add(ts: number, units: Partial<DateTimeUnits>): number {
    const isInt = Number.isInteger;
    if (isInt(units.ms) && units.ms != 0) {
      ts = addMs(ts, units.ms);
    }

    if (isInt(units.second) && units.second != 0) {
      ts = addSeconds(ts, units.second);
    }

    if (isInt(units.minute) && units.minute != 0) {
      ts = addMinutes(ts, units.minute);
    }

    if (isInt(units.hour) && units.hour != 0) {
      ts = addHours(ts, units.hour);
    }

    if (isInt(units.day) && units.day != 0) {
      ts = addDays(ts, units.day);
    }

    if (isInt(units.month) && units.month != 0) {
      ts = this.addMonths(ts, units.month);
    }

    if (isInt(units.year) && units.year != 0) {
      ts = this.addYears(ts, units.year);
    }

    return ts;
  }

  /** 
   * Subtracts a period of time from a timestamp and returns the resulting timestamp.
   * @public
   */
  subtract(ts: number, units: Partial<DateTimeUnits>): number {
    return this.add(ts, {
      year: -units.year,
      month: -units.month,
      day: -units.day,
      hour: -units.hour,
      minute: -units.minute,
      second: -units.second,
      ms: -units.ms,
    });
  }

  /** 
   * Returns true if the given date is valid, otherwise returns false.
   * @public
   * The month count starts with 1, up to 12.
   */
  isValid(year: number, month: number, day: number): boolean {
    return (
      year >= 1 &&
      year <= MAX_YEAR &&
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= this.daysInMonth(year, month)
    );
  }

  /**
   * Gets the ISO day of the week (Monday = 1, ..., Sunday = 7). 
   * @public
   */
  weekDay(time: number): number {
    return (Math.trunc(getCalendarTimestamp(time) / MS_PER_DAY) + 1) % 7;
  }

  /** 
   * Gets the week number of the week year (1 to 52).
   * @public
   * @param ts timestamp
   */
  weekNumber(ts: number, firstDayOfWeek: number, offset: number = 1): number {
    let fn = (tm: number, firstDay: number, fullDays: number): number => {
      let dayForJan1: number;
      let offst: number;
      let day: number;
      const dayOfYear = this.dayOfYear(tm) - 1;
      dayForJan1 = this.weekDay(tm) - (dayOfYear % 7);
      offst = (firstDay - dayForJan1 + 14) % 7;
      if (offst != 0 && offst >= fullDays) {
        offst -= 7;
      }
      day = dayOfYear - offst;
      if (day >= 0) {
        return Math.trunc(day / 7) + 1;
      }
      return fn(addDays(tm, -(dayOfYear + 1)), firstDay, fullDays);
    };

    if (firstDayOfWeek < 0 || firstDayOfWeek > 6) {
      throwInvalidParam('fisrtDayOfWeek');
    }
    // offset = offset % 8;
    if (offset == 1) {
      return getFirstDayWeekOfYear(
        firstDayOfWeek,
        this.dayOfYear(ts),
        this.weekDay(ts)
      );
    } else {
      return fn(ts, firstDayOfWeek, offset);
    }
  }

  /** 
   * Adds the specified number of months to the given timestamp and returns the resulting timestamp.
   * @param ts timestamp
   * @public
   */
  abstract addMonths(ts: number, months: number): number;

  /** 
   * Adds the specified number of years to the given timestamp and returns the resulting timestamp.
   * @public
   * @param ts timestamp
   */
  abstract addYears(ts: number, years: number): number;

  /** 
   * Gets the day of the year (1 to 366).
   * @public
   * @param ts timestamp
   */
  abstract dayOfYear(ts: number): number;

  /** 
   * Returns the number of days in the given year and month.
   * The month count starts with 1, up to 12.
   * @public
   */
  abstract daysInMonth(year: number, month: number): number;

  /** 
   * Returns the number of days in the given year.
   * @param year year
   */
  abstract daysInYear(year: number): number;

  /** 
   * Returns true if this DateTime is in a leap year, false otherwise. 
   * @public
   * @param year year
   */
  abstract isLeapYear(year: number): boolean;

  /** 
   * Returns a timestamp equivalent to the given DateTimeUnits 
   * @public
   * @param units DateTimeUnits
   */
  abstract getTimestamp(units: DateTimeUnits): number;

  /** 
   * Returns a DateTimeUnits(year, month, ...) equivalent to the given timestamp
   * @public
   * @param ts timestamp
   */
  abstract getUnits(ts: number): DateTimeUnits;
}