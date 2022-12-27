import path from 'path'
import { execaSync } from 'execa'
import globalDirs from 'global-dirs'

export interface GlobalPackagesDirs {
  npm?: string
  yarn?: string
  pnpm?: string
}

/**
 * @borrowed from: https://github.com/sindresorhus/is-path-inside/blob/main/index.js
 */
export function isPathInside(childPath: string, parentPath?: string) {
  if (!parentPath)
    return false

  const relation = path.relative(parentPath, childPath)

  return Boolean(
    relation
    && relation !== '..'
    && !relation.startsWith(`..${path.sep}`)
    && relation !== path.resolve(childPath),
  )
}

export function getGlobalPackagesDirs(): GlobalPackagesDirs {
  const npmGlobalDir = globalDirs.npm.packages
  const yarnGlobalDir = globalDirs.yarn.packages
  let pnpmGlobalDir

  try {
    // TODO: SO SLOW!!!!!
    const { stdout } = execaSync('pnpm', ['root', '-g'])
    pnpmGlobalDir = stdout.trim()
  }
  catch { }

  return {
    npm: npmGlobalDir,
    yarn: yarnGlobalDir,
    pnpm: pnpmGlobalDir,
  }
}

export function isInstalledGlobally(globalDirs?: GlobalPackagesDirs) {
  const gd = globalDirs || getGlobalPackagesDirs()
  return (
    isPathInside(__dirname, gd.npm)
    || isPathInside(__dirname, gd.yarn)
    || isPathInside(__dirname, gd.pnpm)
  )
}
