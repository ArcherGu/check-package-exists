import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'check-package-exists',
  target: 'node14',
  clean: true,
  splitting: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  /**
   * @see https://tsup.egoist.dev/#inject-cjs-and-esm-shims
   */
  shims: true,
})
