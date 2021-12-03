import IORedis from 'ioredis';
import { CacheStorage } from '../application/interfaces/cache';
import { RedisObject } from '../application/interfaces/redisObject';
export default class Redis implements CacheStorage {
    private redisInstance: any;

    constructor() {
        this.redisInstance = new IORedis({ host: 'redis' });
    }

    async set(key: string, value: RedisObject, TTL: number) {
        const stringValue = JSON.stringify(value);
        await this.redisInstance.set(key, stringValue, 'ex', TTL);
    }

    async get(key: string) {
        return await this.redisInstance.get(key);
    }
}
