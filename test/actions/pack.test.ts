import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadEnv } from 'vite'
import { resolveOptions } from '../../src/options'
import { createPackContext } from '../../src/actions/pack'
import { createUserContext } from '../../src/actions/user'

const options = resolveOptions({})
const env = loadEnv('', process.cwd(), 'TEST')
const user = createUserContext(options)
user.login({
  username: env.TEST_USERNAME,
  password: env.TEST_PASSWORD,
})

describe('pack action', () => {
  const pack = createPackContext(options)
  it.skip('pack', () => {
    const configPath = resolve(__dirname, '../fixtures/pack.json')
    pack({
      config: configPath,
    }).then((res) => {
      expect(res).toBeInstanceOf(Array)
    })
  })
})
