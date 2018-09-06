const max = (prev, curr) => (prev.lapTime > curr.lapTime ? prev : curr);
const min = (prev, curr) => (prev.lapTime < curr.lapTime ? prev : curr);

/**
 * Helper to determine the slowest lap time
 * @param {Array} lapTimes - the array of lap times
 * @return {Object} - Returns the slowest lap time Object
 */
export const slowestLapTime = lapTimes => lapTimes.reduce(max);

/**
 * Helper to determine the fastest lap time
 * @param {Array} lapTimes - the array of lap times
 * @return {Object} - Returns the fastest lap time Object
 */
export const fastestLapTime = lapTimes => lapTimes.reduce(min);
