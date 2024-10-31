import type { Tuple } from "../types/sharedTypes";

/**
 * Creates a tuple of a specified length, optionally filled with a provided value.
 *
 * @template T - The type of the elements in the tuple.
 * @template L - The length of the tuple.
 * @param length - The length of the tuple.
 * @param fill - An optional value to fill the tuple with.
 * @returns A tuple of the specified length, optionally filled with the provided value.
 */
export function createTuple<T, L extends number>(length: L, fill?: T) {
  return new Array(length).fill(fill) as Tuple<T, L>;
}

