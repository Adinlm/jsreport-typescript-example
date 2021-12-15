import JsReport from 'jsreport'
import express from 'express'
import http, { Server } from 'http'

const app = express()

app.get('/', (req, res) => {
    res.send(`
    <h1>Js report desde app express</h1>
    <ul>
      <li><a href='/reporting'>Access jsreport studio embedded in express app</a></li>
      <li><a href='/report'>Renderizar un reporte anonimo personalizado</a></li>
      <li><a href='/report-stored'>Renderizar un template guardado en jsreport</a></li>
    </ul<
     `)
})

const reportingApp = express();
app.use('/reporting', reportingApp)

const server: Server = http.createServer(app)

const jsreport = JsReport(<any>{
    extensions: {
        express: { app: reportingApp, server: server },
    },
    appPath: "/reporting"
})

jsreport.init().then(() => server.listen(3000))

app.get('/report', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                content: 'Hola desde {{message}}',
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                message: 'Typescript'
            }
        })
        renderResponse.stream.pipe(res)
    } catch (e) {
        next(e)
    }
})

app.get('/report-stored', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                name: '/stock report/main'
            }
        })
        renderResponse.stream.pipe(res)
    } catch (e) {
        next(e)
    }
})




