import { loadConfig } from 'c12'
import { $ } from 'execa'
import type { UserOptions } from './types'
import { resolveOptions } from './options'

async function main() {
  const { config } = await loadConfig<UserOptions>({
    name: 'hbx',
  })
  const options = resolveOptions(config ?? {})
  const argv = process.argv.slice(2, process.argv.length)
  $({
    stdio: 'inherit',
  })`${options.cli} ${argv}`
}

main()
