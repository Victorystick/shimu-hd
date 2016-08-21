import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'src/main.ts',
  dest: './app/shimu.js',

  moduleName: 'Shimu',

  format: 'iife',

  plugins: [
    typescript()
  ]
};
