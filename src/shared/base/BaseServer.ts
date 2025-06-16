import * as http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';

export class Server {
    private express: express.Express;
    readonly port: string;
    httpServer?: http.Server;

    constructor(port: string) {
        this.port = port;
        this.express = express();

        this.express.use(helmet.xssFilter());
        this.express.use(helmet.noSniff());
        this.express.use(helmet.hidePoweredBy());
        this.express.use(helmet.frameguard({ action: 'deny' }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    async listen(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = this.express.listen(this.port, () => {
                resolve();
            });
        });
    }

    /*getHTTPServer() {
        return this.httpServer;
    }*/

    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.httpServer) {
                this.httpServer.close((error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            }

            return resolve();
        });
    }
}
