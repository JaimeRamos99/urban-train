export interface Env {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    VERSION: string | 'v1';
    MONGO_HOST: string | '';
}
