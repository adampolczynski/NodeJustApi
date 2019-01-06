import * as express from 'express';
import * as request from 'request';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';
import { TokenInfoInterface } from './TokenInfoInterface';

@Service()
export class AuthService {

    private httpRequest: typeof request;

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {
        this.httpRequest = request;
    }

    public parseTokenFromRequest(req: express.Request): string | undefined {
        const authorization = req.header('authorization');
        const token = req.header('x-user-token');

        this.log.error(authorization)
        // Retrieve the token form the Authorization header
        if (authorization === 'Bearer') {
            this.log.info('Token provided by the client');
            console.log(token)
            //const x = jwt.verify(token, 'superSecret')
            return token
            // return authorization.split(' ')[1];
        }

        this.log.info('No Token provided by the client');
        return undefined;
    }

    public getTokenInfo(token: string): Promise<TokenInfoInterface> {
        return new Promise((resolve, reject) => {

            const x  = jwt.verify(token, 'superSecret')

            return resolve({ user_email: x.email })
            // this.httpRequest({
            //     method: 'POST',
            //     url: env.auth.route,
            //     form: {
            //         id_token: token,
            //     },
            // }, (error: any, response: request.RequestResponse, body: any) => {
            //     // Verify if the requests was successful and append user
            //     // information to our extended express request object
            //     if (!error) {
            //         if (response.statusCode === 200) {
            //             const tokeninfo = JSON.parse(body);
            //             return resolve(tokeninfo);
            //         }
            //         return reject(body);
            //     }
            //     return reject(error);
            // });
        });
    }

}
