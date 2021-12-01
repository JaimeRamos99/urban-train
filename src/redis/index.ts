import { createClient } from 'redis';
import { Logger } from '../logger';

const client = createClient();

client.on('connect', () => {
    Logger.info('ff');
});
