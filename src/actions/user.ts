import { $ } from 'execa'
import { decodeGbk, parseArgs } from '../utils'
import type { Options } from '../types'

export interface IUserLogin {
  username: string
  password: string
}

export function createUserContext(options: Options) {
  const cli = `${options.cli}`
  return {
    info() {
      const { stdout } = $.sync`${cli} user info`
      const matches = /^(.*)\s+0:user\sinfo:OK/gm.exec(stdout)
      if (matches) {
        return matches[1]
      }
    },
    login(payload: IUserLogin) {
      const { stdout } = $({
        encoding: null,
      }).sync`${cli} user login ${parseArgs(payload)}`
      const output = decodeGbk(stdout)
      if (output.startsWith('0:user login:OK')) {
        return true
      }

      throw new Error(output)
    },
    logout() {
      const { stdout } = $.sync`${cli} user logout`
      return stdout.startsWith('0:user logout:OK')
    },
  }
}
