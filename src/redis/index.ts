import IORedis from 'ioredis';
import { CacheStorage } from '../application/interfaces/cache';
export default class Redis implements CacheStorage {
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
