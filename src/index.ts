import path from 'path'
import { sync as resolve } from 'resolve'
import type { GlobalPackagesDirs } from './utils'
import { getGlobalPackagesDirs, isInstalledGlobally } from './utils'

const cache: { globalDirs: GlobalPackagesDirs | undefined } = {
  globalDirs: undefined,
}

export function checkPackageExists(name: string) {
  if (!cache.globalDirs)
    cache.globalDirs = getGlobalPackagesDirs()

  const globalDirs = cache.globalDirs

  // reference: https://github.com/slidevjs/slidev/blob/main/packages/slidev/node/utils.ts
  try {
    return !!resolve(name, {
      preserveSymlinks: false,
    })
  }
  catch { }

  if (isInstalledGlobally(globalDirs)) {
    try {
      if (globalDirs.yarn)
        return !!require.resolve(path.join(globalDirs.yarn, name))
    }
    catch { }

    try {
      if (globalDirs.pnpm)
        return !!require.resolve(path.join(globalDirs.pnpm, name))
    }
    catch { }

    try {
      if (globalDirs.npm)
        return !!require.resolve(path.join(globalDirs.npm, name))
    }
    catch { }
  }

  return false
}
