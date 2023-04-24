import { describe, expect, it } from 'vitest'
import { loadEnv } from 'vite'
import { isCI } from 'std-env'
import { resolveOptions } from '../../src/options'
import { createUserContext } from '../../src/actions/user'

const options = resolveOptions({})
const env = loadEnv('', process.cwd(), 'TEST')

describe('user action', async () => {
  const user = createUserContext(options)
  await it('login', () => {
    const isLogin = user.login({
      username: env.TEST_USERNAME,
      password: env.TEST_PASSWORD,
    })
    expect(isLogin).toBeTruthy()
  })
  it('info', async () => {
    const info = user.info()
    if (!isCI) {
      expect(info)
        .toEqual(env.TEST_USERNAME)
    }
  })
  it('logout', () => {
    const isLogout = user.logout()
    expect(isLogout).toBeTruthy()
  })
})
