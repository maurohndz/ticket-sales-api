import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.set('env', process.env.ENVIRONMENT);
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = http.createServer(app);

server.listen(Number(process.env.PORT), () => {
    console.log(`API is running on port ${Number(process.env.PORT)} in ${app.get('env')} mode`);
});
