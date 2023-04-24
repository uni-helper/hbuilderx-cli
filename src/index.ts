import { createOpenContext } from './actions/open'
import { createPackContext } from './actions/pack'
import { createProjectContext } from './actions/project'
import { createUserContext } from './actions/user'
import { resolveOptions } from './options'
import type { UserOptions } from './types'

export * from './config'
export * from './types'
export * from './options'
export * from './actions/open'
export * from './actions/pack'
export * from './actions/project'
export * from './actions/user'

export function createHbuilderX(userOptions: UserOptions = {}) {
  const options = resolveOptions(userOptions)
  return {
    user: createUserContext(options),
    project: createProjectContext(options),
    open: createOpenContext(options),
    pack: createPackContext(options),
  }
}
