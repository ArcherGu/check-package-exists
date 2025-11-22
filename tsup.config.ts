import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'check-package-exists',
  target: 'node14',
  clean: true,
  splitting: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
})
