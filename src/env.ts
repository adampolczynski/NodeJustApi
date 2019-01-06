import * as dotenv from 'dotenv';
import * as path from 'path';

import { getOsEnv, getOsEnvArray, normalizePort, toBool, toNumber } from './lib/env';
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

export const env = {
    node: 'development',
    app: {
        name: 'just-api',
        routePrefix: '/api',
        host: 'localhost',
        port: 4000,
        dirs: {
            entities: (
                getOsEnvArray('TYPEORM_ENTITIES') ||
                [path.relative(path.join(process.cwd()), path.join(__dirname, 'api/models/**/*{.js,.ts}'))]
            ) as string[],
            controllers: (
                getOsEnvArray('CONTROLLERS') ||
                [path.join(__dirname, 'api/controllers/**/*Controller{.js,.ts}')]
            ) as string[],
            middlewares: (
                getOsEnvArray('MIDDLEWARES') ||
                [path.join(__dirname, 'api/middlewares/**/*Middleware{.js,.ts}')]
            ) as string[],
            interceptors: (
                getOsEnvArray('INTERCEPTORS') ||
                [path.join(__dirname, 'api/interceptors/**/*Interceptor{.js,.ts}')]
            ) as string[],
            subscribers: (
                getOsEnvArray('TYPEORM_SUBSCRIBERS') ||
                [path.join(__dirname, 'api/subscribers/**/*Subscriber{.js,.ts}')]
            ) as string[],
        }
    },
    auth: {
        route: getOsEnv('AUTH_ROUTE'),
    },
    db: {
        type: getOsEnv('TYPEORM_CONNECTION'),
        host: getOsEnv('TYPEORM_HOST'),
        port: toNumber(getOsEnv('TYPEORM_PORT')),
        username: getOsEnv('TYPEORM_USERNAME'),
        password: getOsEnv('TYPEORM_PASSWORD'),
        database: getOsEnv('TYPEORM_DATABASE'),
        synchronize: toBool(getOsEnv('TYPEORM_SYNCHRONIZE')),
        logging: toBool(getOsEnv('TYPEORM_LOGGING')),
    },
    log: {
        level: 'info',
        json: false,
        output: ''
    }
}