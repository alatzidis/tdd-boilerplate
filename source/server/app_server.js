import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'

export default function startServer() {
  const port = process.env.PORT || 3000
  const app = new Koa()
  const router = new Router()
  const use = app.use

  app.use = x => use.call(app, convert(x))
  app.use(compress())
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (e) {
      const context = ctx
      context.status = e.status || e.statusCode || 500
      context.body = {
        message: e.message,
      }
    }
  })
  app.use(bodyParser())
  app.use(serve('./build', {
    maxage: 120 * 1000,
    gzip: true,
  }))
  app.use(serve('./static', {
    maxage: 120 * 1000,
    gzip: true,
  }))
  app.use(serve('./tests/pages', {
    maxage: 120 * 1000,
    gzip: true,
  }))

  router.get('/hello/:name', async (ctx) => {
    if (isNaN(ctx.params.name)) {
      const context = ctx
      context.body = {
        hello: ctx.params.name,
      }
    } else {
      throw new Error('Name should not be a number')
    }
  })

  app.use(router.routes())

  const server = app.listen(port, () => {
    const host = server.address().address
    const usedPort = server.address().port
    console.log(`Server is listening at http://${host}:${usedPort}`) // eslint-disable-line no-console
  })

  return port
}
