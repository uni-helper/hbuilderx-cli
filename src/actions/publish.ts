import type { ExecaReturnBase } from 'execa'
import { $ } from 'execa'
import type { Options } from '../types'
import { parseArgs } from '../utils'

export interface PublishAppResourcePayload {
  /**
   * 原生App
   */
  platform: 'APP'
  /**
   * 生成本地打包App资源
   */
  type: 'appResource'
  /**
   * 项目名称
   */
  project: string
}

export interface PublishWgtPayload {
  platform: 'APP'
  /**
   * 制作应用wgt包
   */
  type: 'wgt'
  /**
   * 项目名称
   */
  project: string
  /**
   * 导出名称
   * @default "AppID.wgt"
   */
  name?: string
  /**
   * 导出路径
   * @default `${src}/unpackage/release`
   */
  path?: string
  /**
   * 对配置的js/nvue文件进行原生混淆
   * @default false
   */
  confuse?: boolean
}

export interface PublishMpWeixinPayload {
  platform: 'mp-weixin'
  /**
   * 项目名称
   */
  project: string
  /**
   * 微信小程序appid
   */
  appid: string
  /**
   * 发行为混合包
   */
  subPackage?: string
  /**
   * 打包后是否上传到微信平台
   */
  upload?: boolean
  /**
   * 上传的小程序描述
   */
  description?: string
  /**
   * 微信代码上传密钥文件
   * @see https://hx.dcloud.net.cn/cli/publish-mp-weixin?id=uploadprivatekey
   */
  privatekey?: string
  /**
   * 上传小程序的版本号；选填。如果不填写，则会读取manifest.json中的版本号
   */
  version?: string
  /**
   * 生成 SourceMap
   * @default false
   */
  sourceMap?: boolean
  /**
   * 指定微信ci机器人编号
   * @default 1
   */
  robot?: number
}

export interface PublishH5Payload {
  platform: 'h5'
  /**
   * 项目名称
   */
  project: string
  /**
   * ssr发行(项目使用vue3时配置此项才生效)
   * @default false
   */
  ssr?: boolean
  /**
   * 网站域名
   */
  webDomain?: string
  /**
   * 网站标题
   */
  webTitle?: string
  /**
   * 前端网页托管
   */
  webHosting?: boolean
  /**
   * uniCloud 服务商代号
   */
  provider?: 'aliyun'
  /**
   * uniCloud 云空间id
   */
  spaceId?: string
}

export interface PublishFunc {
  (payload: PublishAppResourcePayload | PublishWgtPayload | PublishMpWeixinPayload | PublishH5Payload): ExecaReturnBase<string>
  appResource: (payload: Omit<PublishAppResourcePayload, 'type' | 'platform'>) => ExecaReturnBase<string>
  wgt: (payload: Omit<PublishWgtPayload, 'type' | 'platform'>) => ExecaReturnBase<string>
  mpWeixin: (payload: Omit<PublishMpWeixinPayload, 'platform'>) => ExecaReturnBase<string>
  h5: (payload: Omit<PublishH5Payload, 'platform'>) => ExecaReturnBase<string>
}

export function createPublishContext(options: Options) {
  const cli = `${options.cli}`
  const publish: PublishFunc = (
    payload: PublishAppResourcePayload | PublishWgtPayload | PublishMpWeixinPayload | PublishH5Payload,
  ) => {
    return $.sync`${cli} open ${parseArgs(payload)}`
  }

  // add alias
  publish.appResource = payload => publish({
    platform: 'APP',
    type: 'appResource',
    ...payload,
  })
  publish.wgt = payload => publish({
    platform: 'APP',
    type: 'wgt',
    ...payload,
  })
  publish.mpWeixin = payload => publish({
    platform: 'mp-weixin',
    ...payload,
  })
  publish.h5 = payload => publish({
    platform: 'h5',
    ...payload,
  })

  return publish
}
