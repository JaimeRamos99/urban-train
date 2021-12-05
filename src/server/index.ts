import { Server } from 'http';
import express, { Express } from 'express';
import routes from '../routes';
import { WebServer } from '../application/interfaces/server';
import { morganMiddleware } from '../middlewares/morgan';
import { Logger } from '../logger';
import { envVars } from '../common/utils/envVarsHandler';
import { json } from 'body-parser';
import { closeConnection, createConnection } from '../mongo';
import Redis from '../redis';

export default class implements WebServer {
    private app: Express;
    private port: number;
    private server!: Server;

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    async setup(): Promise<void> {
        this.app.use(json());
        this.app.use(morganMiddleware);
        this.app.use(routes);
        await createConnection();
    }

    start(): void {
        this.server = this.app.listen(this.port);
        Logger.info(`Server started on port ${envVars.PORT}`);
    }

    async stop(error: any): Promise<void> {
        const redis = new Redis();
        await redis.disconnect();
        closeConnection();
        this.server.close();
        Logger.error(error);
    }

    returnApp(): Express {
        return this.app;
    }
}
