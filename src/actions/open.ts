import { $ } from 'execa'
import type { Options } from '../types'
import { parseArgs } from '../utils'

export interface OpenPayload {
  file?: string
}

export function createOpenContext(options: Options) {
  const cli = `${options.cli}`
  return function (payload: OpenPayload = {}) {
    return $.sync`${cli} open ${parseArgs(payload)}`
  }
}
