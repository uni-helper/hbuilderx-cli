import { describe, expect, it } from 'vitest'
import { normalizePath } from 'vite'
import { resolveOptions } from '../../src/options'
import { createProjectContext } from '../../src/actions/project'

const options = resolveOptions({})

describe('project action', () => {
  const project = createProjectContext(options)
  it('list', () => {
    const list = project.list()
    expect(list).toBeInstanceOf(Array)
  })

  it('open', () => {
    const isOpen = project.open({
      path: normalizePath(process.cwd()),
    })
    expect(isOpen).toBe(true)
  })

  it('close', () => {
    const isClosed = project.close({
      path: normalizePath(process.cwd()),
    })
    expect(isClosed).toBe(true)
  })
})
