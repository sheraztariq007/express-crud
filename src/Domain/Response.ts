import * as VError from "verror";

export type ResponseWrapper<T> = {
  error: VError;
  response: T | null;
};
