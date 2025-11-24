import type { GlobalPackagesDirs } from './utils'
import path from 'node:path'
import resolve from 'resolve'
import { getGlobalPackagesDirs, isInstalledGlobally } from './utils'

const cache: { globalDirs: GlobalPackagesDirs | undefined } = {
  globalDirs: undefined,
}

function addPackageJsonFile(name: string): string {
  if (name.endsWith('/package.json'))
    return name

  return path.join(name, 'package.json')
}

export function checkPackageExists(name: string) {
  name = addPackageJsonFile(name)
  // reference: https://github.com/slidevjs/slidev/blob/main/packages/slidev/node/utils.ts
  try {
    return !!resolve.sync(name, {
      preserveSymlinks: false,
    })
  }
  catch { }

  if (!cache.globalDirs)
    cache.globalDirs = getGlobalPackagesDirs()

  const globalDirs = cache.globalDirs

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
