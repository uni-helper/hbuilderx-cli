import { describe, expect, it } from 'vitest'
import { createPublishContext } from '../../src/actions/publish'
import { resolveOptions } from '../../src/options'

const options = resolveOptions({})
const publish = createPublishContext(options)

describe('publish action', () => {
  it.skip('publish h5', async () => {
    const output = await publish.h5({
      project: 'test-pack',
    })

    expect(output).toContain('/test-pack/unpackage/dist/build/h5')
  }, 1000 * 30)
})
