import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('env', process.env.ENVIRONMENT);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const server = http.createServer(app);

server.listen(Number(process.env.PORT), async () => {
    console.log(`API is running on port ${Number(process.env.PORT)} in ${app.get('env')} mode`);
});