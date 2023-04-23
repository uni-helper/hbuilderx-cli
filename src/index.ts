import { createUserContext } from "./actions/user";
import { resolveOptions } from "./options";
import { UserOptions } from "./types";
export * from "./config";

export function createHbuilderX(userOptions: UserOptions = {}) {
  const options = resolveOptions(userOptions);
  return {
    user: createUserContext(options),
  };
}
