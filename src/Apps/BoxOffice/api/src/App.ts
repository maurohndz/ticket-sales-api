import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { registerRoutes } from './routes/index';

const app = express();

app.set('env', process.env.ENVIRONMENT);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

registerRoutes(app);

const server = http.createServer(app);

server.listen(Number(process.env.APP_BOX_OFFICE_API_PORT), async () => {
    console.log(`API is running on port ${Number(process.env.APP_BOX_OFFICE_API_PORT)} in ${app.get('env')} mode`);
});