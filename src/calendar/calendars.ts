import { Calendar2 } from './calendar__';

const repository = new Array<Calendar2>();
let defaultCal: Calendar2;

export abstract class Calendars {
    /** Fets or sets the default calendar. */
    static set default(value: Calendar2) {
        defaultCal = value;
    }

    static get default(): Calendar2 {
        return defaultCal;
    }

    /** Adds a [Calendar] to the calendars repository. */
    static add(c: Calendar2): void {
        if (!this.get(c.id)) {
            repository.push(c);
            if (repository.length === 0) {
                defaultCal = c;
            }
        }
    }

    /** Finds a calendar by name in the calendar repository. */
    static get(id: string): Calendar2 {
        return repository.find(x => x.id === id);
    }

    /** Gets the number of calendars in the repository. */
    static count(): number {
        return repository.length;
    }
}
