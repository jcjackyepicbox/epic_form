import typescript from '@rollup/plugin-typescript';
import visualizer from 'rollup-plugin-analyzer';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist/',
      format: 'cjs',
    },
  ],
  external: ['react', 'classnames', 'react-dom'],
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    typescript({
      declaration: true,
      declarationDir: 'dist/types/',
      rootDir: 'src/',
    }),
    postcss({
      modules: true,
      extract: false,
    }),
    visualizer({
      summaryOnly: true,
    }),
  ],
};
