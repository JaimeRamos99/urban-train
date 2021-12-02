export interface CacheStorage {
    set(key: string, value: number): Promise<void>;
    get(key: string): Promise<number>;
}
