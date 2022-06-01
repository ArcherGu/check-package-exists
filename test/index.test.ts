import { describe, expect, it } from 'vitest'
import { checkPackageExists } from '../src'

describe('package exists', () => {
  it('should return true when package exists', () => {
    expect(checkPackageExists('vitest')).toBe(true)
  })

  it('should return false when package not exists', () => {
    expect(checkPackageExists('vitest-not-exists')).toBe(false)
  })
})
