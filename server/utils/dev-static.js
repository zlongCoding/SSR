const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ReactSSR = require("react-dom/server")
const proxy = require('http-proxy-middleware')

const serverConfig = require("../../build/webpack.config.server.js")




const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const mfs = new MemoryFs()
const Module = module.constructor
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = new Module()
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})




module.exports = function (app) {
    app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for compile, refresh later')
    }
    getTemplate().then(template => {
      const appString = ReactSSR.renderToString(serverBundle)
      res.send(template.replace("<!-- app --->", appString))
    }).catch(next)
  })

}