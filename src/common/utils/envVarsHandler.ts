import dotenv from 'dotenv';
import { Env } from '../../application/interfaces/environmentVariables';
dotenv.config();

const environmentVariables = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
};

const getConfig = (): Env => {
    return environmentVariables;
};

const getSanitzedConfig = (config: Env): Env => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Env;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export { sanitizedConfig as envVars };
