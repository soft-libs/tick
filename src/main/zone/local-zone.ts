/**
 * @category Zone
 * @module LocalZone
 */


import { Zone } from './zone';

/** 
 * The local time zone of this computer.
 */
export class LocalZone extends Zone {
    /**
     * Do not call this constructor. Use "Zones.local" instead.
     */
    constructor() {
        super('Local');
    }

    getOffset(timestamp: number): number {
        return -new Date(timestamp).getTimezoneOffset();
    }
}
