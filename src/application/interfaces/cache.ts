import { RedisObject } from './redisObject';

export interface CacheStorage {
    set(key: string, value: RedisObject, TTL: number): Promise<void>;
    get(key: string): Promise<number>;
}
