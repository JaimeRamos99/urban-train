//import { Logger } from '../logger';
import IORedis from 'ioredis';

export default class Redis {
    private redisInstance: any;
    constructor() {
        this.redisInstance = new IORedis();
    }
    async set(key: string, value: number) {
        await this.redisInstance.set(key, value);
    }
    async get(key: string) {
        return await this.redisInstance.get(key);
    }
}
