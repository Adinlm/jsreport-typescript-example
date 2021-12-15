
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
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
        rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
        crossorigin="anonymous">
    </head>
    <body class="mt-3 ms-3">
        <h1>Js report desde app express</h1>
        
        <ul>
        <li><a href='/reporting'>Acceder a jsreport studio a traves de la app</a></li>
        <li><a href='/report-clinica'>Renderizar ejemplo</a></li>
        <li><a href='http://localhost:3000/reporting/api/report/docx%20ejemplo'>docx ejemplo</a></li>
        <li><a href='http://localhost:3000/reporting/templates/xy7O19Ky-k'>excel ejemplo</a></li>
        </ul>
     </body>
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
                content: 'Hola desde {{message}}',
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                message: 'javascript'
            }
        });
        renderResponse.stream.pipe(res);
    }
    catch (e) {
        next(e);
    }
});

/*
app.get('/report-docx', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            link: 'http://localhost:3000/reporting/templates/fyhFk6m_hd',
                
            
        });
        renderResponse.stream.pipe(res);
    }
    catch (e) {
        next(e);
    }
});
*/


app.get('/report-clinica', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                name: '/clinica-ejemplo/clinicaejemplo'
            }
        });
        renderResponse.stream.pipe(res);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=integrated.js.map*/