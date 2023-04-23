import { expect, it, describe } from "vitest";
import { findSoftware, parseArgs } from "../src/utils";
import { HBUILDERX_APP_NAME } from "../src/constant";
import { isCI, isMacOS, isWindows } from "std-env";

describe("utils", () => {
  it("findSoftware", () => {
    const path = findSoftware(HBUILDERX_APP_NAME);
    if (!isCI) {
      if (isWindows) {
        expect(path).toContain("HBuilderX.exe");
      }
      if (isMacOS) {
        expect(path).toContain("HBuilderX.app");
      }
    }
  });

  it("parseArgs", () => {
    const payload = {
      name: "test",
      value: "test",
      hello: true,
    };
    const result = parseArgs(payload);
    expect(result).toEqual(["--name", "test", "--value", "test", "--hello"]);
  });
});
