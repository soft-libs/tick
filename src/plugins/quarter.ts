import { DateTime } from '../date-time';

/** 
 * Get the quarter. 
 * @public
 */
export function quarter(d: DateTime): number {
    return Math.floor(d.month / 4) + 1;
}