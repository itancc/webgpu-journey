type _Tuple<T, L extends number, R extends T[] = []> = R["length"] extends L
  ? R
  : _Tuple<T, L, [T, ...R]>;

/**
 * Create a T tuple of length N
 * @example
 * type A = Tuple<string, 3> // [string, string, string]
 */
export type Tuple<T, L extends number> = _Tuple<T, L>;

export type Nullable<T> = T | null;
