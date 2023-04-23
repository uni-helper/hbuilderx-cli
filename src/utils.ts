import { execSync } from "child_process";
import { $ } from "execa";

import { isWindows, isMacOS } from "std-env";

export function decodeGbk(input?: BufferSource) {
  const decoder = new TextDecoder("gbk");
  return decoder.decode(input);
}

export function findSoftware(name: string) {
  if (isWindows) {
    const cmd = `reg query "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows NT\\CurrentVersion\\AppCompatFlags\\Compatibility Assistant\\Store" /f "${name}.exe" /c`;
    const resultBuffer = execSync(cmd);
    const result = decodeGbk(resultBuffer);
    const regex = /^.*?(\w:\\.*?)\s*REG_BINARY/gm;
    const matches = regex.exec(result);
    if (matches && matches[1]) return matches[1];
  }
  if (isMacOS) return `/Applications/${name}.app`;
}

export function parseArgs(args: unknown) {
  let _args: string[] = [];
  if (typeof args === "string") {
    _args = args.split(" ");
  } else if (Array.isArray(args)) {
    _args = args;
  } else if (typeof args === "object" && args !== null && args !== undefined) {
    _args = Object.entries(args).flatMap(([key, value]) => {
      if (typeof value === "boolean") {
        return [`--${key}`];
      }
      return [`--${key}`, value];
    });
  }
  return _args;
}
