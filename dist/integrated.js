"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsreport_1 = __importDefault(require("jsreport"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = express_1.default();
app.get('/', (req, res) => {
    res.send(`
     <h1>Js report desde app express</h1>
     <ul>
       <li><a href='/reporting'>Access jsreport studio embedded in express app</a></li>
       <li><a href='/report'>Renderizar un reporte anonimo personalizado</a></li>
       <li><a href='/report-stored'>Renderizar un template guardado en jsreport</a></li>
     </ul<
     `);
});
const reportingApp = express_1.default();
app.use('/reporting', reportingApp);
const server = http_1.default.createServer(app);
const jsreport = jsreport_1.default({
    extensions: {
        express: { app: reportingApp, server: server },
    },
    appPath: "/reporting"
});
jsreport.init().then(() => server.listen(3000));
app.get('/report', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                content: 'Clinica {{message}}',
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                message: 'Alemana'
            }
        });
        renderResponse.stream.pipe(res);
    }
    catch (e) {
        next(e);
    }
});
app.get('/report-stored', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                name: '/stock report/main'
            }
        });
        renderResponse.stream.pipe(res);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=integrated.js.map