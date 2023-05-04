import { $ } from 'execa'
import type { Options } from '../types'
import { decodeGbk, parseArgs } from '../utils'

export interface ProjectOpenPayload {
  path: string
}

export interface ProjectClosePayload {
  path: string
}

export function createProjectContext(options: Options) {
  const cli = options.cli
  return {
    list() {
      const { stdout } = $({
        encoding: null,
      }).sync`${cli} project list`
      const output = decodeGbk(stdout)
      const matches = output.matchAll(/\d\s-\s(.*?)\s/gm)
      return [...matches].map(match => match[1])
    },
    open(args: ProjectOpenPayload) {
      const { stdout } = $({
        encoding: null,
      }).sync`${cli} project open ${parseArgs(args)}`
      const output = decodeGbk(stdout)
      return output.includes('项目导入成功')
    },
    close(args: ProjectClosePayload) {
      const { stdout } = $({
        encoding: null,
      }).sync`${cli} project close ${parseArgs(args)}`
      const output = decodeGbk(stdout)
      return output.startsWith('项目关闭完成')
    },
  }
}
