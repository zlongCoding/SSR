const Router = require("koa-router")
const fs = require("fs")
const path = require("path")
const MemoryFS = require("memory-fs")
const axios = require("axios")
const webpack = require("webpack")
var MemoryFileSystem = require("memory-fs");
const { createBundleRenderer } = require('vue-server-renderer')
const serverRender = require('./server-render')

const mfs = new MemoryFS()
const webpackConfig = require("../../build/webpack.config.server.js")
const compiler = webpack(webpackConfig)
compiler.outputFileSystem = mfs

let bundle
compiler.watch({}, (err, stats) => {
	if (err) throw err
	stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
  	webpackConfig.output.path,
  	'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

const handleSSR =  async (ctx) => {
  if (!bundle) {
    return ctx.body = '稍等片刻'
  }
   const clientManifestResp = await axios.get(
    'http://127.0.0.1:9000/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../template.ejs'),
    'utf-8'
  )

  const renderer = createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })
  await serverRender(ctx, renderer, template)

}

const router = new Router()
router.get('*', handleSSR)


module.exports = router






















