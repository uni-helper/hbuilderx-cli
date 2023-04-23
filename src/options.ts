import { isMacOS, isWindows } from "std-env";
import { HBUILDERX_APP_NAME } from "./constant";
import { Options, UserOptions } from "./types";
import { findSoftware } from "./utils";
import { dirname, resolve } from "path";

export function resolveOptions(userOptions: UserOptions = {}): Options {
  let cli = userOptions.cli;
  if (!cli) {
    const hbXPath = findSoftware(HBUILDERX_APP_NAME);
    if (!hbXPath) {
      throw new Error("Can not find HBuilderX cli");
    }
    if (isMacOS) {
      cli = resolve(dirname(hbXPath), "Contents", "MacOS", "cli");
    } else if (isWindows) {
      cli = resolve(dirname(hbXPath), "cli.exe");
    }
    if (!cli) {
      throw new Error("Can not find HBuilderX cli");
    }
  }

  return {
    ...userOptions,
    cli,
    cwd: process.cwd(),
  };
}
