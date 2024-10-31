import { Tuple } from "../types/sharedTypes";
import { createTuple } from "../utils/Shared";

export class Matrix3 {
  private readonly _m: Tuple<number, 9>;

  public get m() {
    return this._m;
  }

  constructor(m = createTuple(9, 0)) {
    this._m = m;
  }
}
