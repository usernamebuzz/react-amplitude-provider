import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
    },
    plugins: [typescript(), resolve(), commonjs()],
    external: ['react', '@amplitude/analytics-browser'],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
    },
    plugins: [typescript(), resolve(), commonjs()],
    external: ['react', '@amplitude/analytics-browser'],
  },
]
