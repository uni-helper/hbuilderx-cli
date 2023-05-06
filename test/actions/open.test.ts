import { relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { $ } from 'execa'
import { isWindows } from 'std-env'
import { resolveOptions } from '../../src/options'
import { createOpenContext } from '../../src/actions/open'

const options = resolveOptions({})
const open = createOpenContext(options)

describe('open action', async () => {
  it('open', async () => {
    await open()
    // TODO: test MacOS
    if (isWindows) {
      const { stdout } = await $.sync`tasklist`
      expect(stdout).toContain('HBuilderX.exe')
    }
  })
  it('open file', () => {
    open({
      file: relative(process.cwd(), resolve(__dirname, '../fixtures/pack.json')),
    })
  })
})
