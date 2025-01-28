import lightwing from '@lightwing/eslint-config'

export default lightwing(
  {
    ignores: [
      'dist',
      'node_modules',
      '*.svelte',
      '*.snap',
      '*.d.ts',
      'coverage',
      'js_test',
      'packages/**/assets',
      'packages/**/dist',
      'local-data',
    ],
  },
)
