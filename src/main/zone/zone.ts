/**
 * @category Zone
 * @module Zone
 */


/** 
 * An abstract base class for all time zones 
 * @public
 * @abstract
 */
export abstract class Zone {
    #name: string;

    constructor(name: string) {
        this.#name = name;
    }

    /** 
     * Gets the zone name
     * @public
     */
    get name() {
        return this.#name;
    }

    /** 
     * Returns the offset of the zone (in minutes)
     * @public
     */
    abstract getOffset(timestamp: number): number;

    /** 
     * Returns the current offset of the zone (in minutes)
     * @public
     */
    getCurrentOffset(): number {
        return this.getOffset(Date.now());
    }
}
