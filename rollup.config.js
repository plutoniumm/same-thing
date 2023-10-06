import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import esbuild from 'rollup-plugin-esbuild';

export default {
  input: 'src/index.ts',
  output: {
    file: 'index.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    typescript(), esbuild()
  ],
};
