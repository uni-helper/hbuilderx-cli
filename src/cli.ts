import { loadConfig } from "c12";
import { UserOptions } from "./types";
import { resolveOptions } from "./options";
import { $ } from "execa";

async function main() {
  const { config } = await loadConfig<UserOptions>({
    name: "hbx",
  });
  const options = resolveOptions(config ?? {});
  $({
    stdio: "inherit",
  })`${options.cli} ${process.argv.splice(2, 1)[0]}`;
}

main();
