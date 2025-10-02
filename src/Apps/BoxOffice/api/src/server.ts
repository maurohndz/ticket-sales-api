import http from 'http';
import { createApp } from './App';
import { mountContainer } from '../di/index';

(async () => {
    await mountContainer;

    const app = await createApp();

    const server = http.createServer(app);
    const port = Number(process.env.APP_BOX_OFFICE_API_PORT);

    server.listen(port, () => {
        console.log(`API is running on port ${port} in ${app.get('env')} mode`);
    });
})();