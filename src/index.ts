import { envVars } from './common/utils/envVarsHandler';
import WebServer from './server';

const server = new WebServer(envVars.PORT || 3000);

const main = async () => {
    server.setup();
    server.start();
};

process.on('uncaughtException', (error) => server.stop(error));
process.on('SIGINT', (error) => server.stop(error));
process.on('SIGTERM', (error) => server.stop(error));
process.on('SIGHUP', (error) => server.stop(error));

main();

export default server.returnApp();
