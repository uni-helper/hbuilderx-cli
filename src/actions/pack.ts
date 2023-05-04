import { setTimeout } from 'node:timers'
import { $ } from 'execa'
import type { Options } from '../types'
import { decodeGbk, parseArgs } from '../utils'

export interface PackPayload {
  /**
   * 打包命令帮助
   */
  help?: boolean
  /** 配置文件绝对路径，配置文件配置，参考[配置文件](https://hx.dcloud.net.cn/cli/pack?id=config) */
  config?: string
  /**
   * HBuilder X里导入的项目名或绝对路径
   */
  project?: string
  /** 配打包平台,默认值android,取值有"android","ios"如果要打多个逗号隔开 */
  platform?: string | 'android' | 'ios'
  /** 是否使用自定义基座 默认值false, true自定义基座 false自定义证书 */
  iscustom?: boolean
  /** 打包方式是否为安心打包,默认值false,true安心打包,false传统打包 */
  safemode?: boolean
  /** 是否对配置的js/nvue文件进行原生混淆，true打开 false关闭 */
  isconfusion?: boolean
  /** 开屏广告,默认值false, true打开 false关闭 */
  splashads?: boolean
  /** 悬浮红包广告,默认值false, true打开 false关闭 */
  rpads?: boolean
  /** push广告,默认值false, true打开 false关闭 */
  pushads?: boolean
  /** 加入换量联盟,默认值false, true加入 false不加入 */
  exchange?: boolean
  'android.packagename'?: string
  'android.androidpacktype'?: string
  'android.certalias'?: string
  'android.certfile'?: string
  'android.certpassword'?: string
  'android.channels'?: string
  'ios.bundle'?: string
  'ios.supporteddevice'?: string
  'ios.isprisonbreak'?: string
  'ios.profile'?: string
  'ios.certfile'?: string
  'ios.certpassword'?: string
}

export function createPackContext(options: Options) {
  const cli = options.cli
  let waitBuildTimer: NodeJS.Timeout
  return function (payload: PackPayload) {
    const { stdout, kill } = $({
      encoding: null,
      buffer: true,
      stdin: 'pipe',
    })`${cli} pack ${parseArgs(payload)}`
    return new Promise<string[]>((resolve, reject) => {
      const downloadUrls: string[] = []
      waitBuildTimer = setTimeout(() => {
        kill()
        reject(new Error('等待本地打包资源超时'))
      }, 5000)
      stdout?.on('data', (data) => {
        const optput = decodeGbk(data)
        const isStartBuild = optput.includes('正在编译打包资源')
        const hasTask = optput.includes('是否继续提交')
        if (isStartBuild || hasTask) {
          clearTimeout(waitBuildTimer)
        }
        if (hasTask) {
          kill()
          reject(new Error('cli 暂不支持重新排队，请等待云端打包完成后重试，或使用 HBuildX 编辑器打包'))
        }
        const matches = optput.matchAll(/下载地址:\s(https:\/\/.*?)\s/gm)
        const match = [...matches].map(v => v[1])[0]
        if (match) {
          downloadUrls.push(match)
        }
        // eslint-disable-next-line no-console
        console.log(`${optput}`)
      })
      stdout?.on('close', () => {
        resolve(downloadUrls)
      })
    })
  }
}
