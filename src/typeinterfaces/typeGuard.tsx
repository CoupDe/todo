import { TrefreshToken } from "./types";

export function isRefreshToken(data: unknown): data is TrefreshToken {
  return typeof data === "object" && data != null && "access" in data;
}
