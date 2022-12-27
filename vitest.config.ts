import type { UserConfig } from 'vitest'

const config: { test: UserConfig } = {
  test: {
    testTimeout: 50000,
    deps: {
      interopDefault: true,
    },
  },
}

export default config
