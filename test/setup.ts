import { createOpenContext } from '../src/actions/open'
import { resolveOptions } from '../src/options'

const options = resolveOptions({})
const open = createOpenContext(options)
open()
