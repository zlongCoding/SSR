const Koa = require("koa")
const app = new Koa()

const pageRouter = require("./router/dev-ssr.js")

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const PORT = process.env.PORT || 8090
app.listen(PORT, () => {
	console.log(`server is runing ${PORT}`)
})
