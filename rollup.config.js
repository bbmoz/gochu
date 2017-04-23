import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const config = {
  format: 'umd',
  moduleName: 'index.js',
  plugins: [
    nodeResolve({ modulesOnly: true }),
    babel()
  ]
}

export default config
