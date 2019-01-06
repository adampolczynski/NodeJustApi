import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { events } from '../subscribers/events';

import * as jwt from 'jsonwebtoken';
import { ILoginData } from '../../../types/ILoginData';

import { isNil } from 'lodash';

const superSecret = 'superSecret';

@Service()
export class LoginService {

    private findOptions = { relations: ['interests', 'interests.activity'] };

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        private userService: UserService,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }
public async login(user: ILoginData): Promise<CustomResponse> {

        const loggedUser = await this.userRepository.findOne({ email: user.email, password: user.password });
        // const loggedUser = await this.userRepository.findOne({ email: user.email, password: user.password }, this.findOptions);

        const found = !isNil(loggedUser);
        let token;

        if (found) {
            token = jwt.sign({ email: user.email }, superSecret, {
                expiresIn: '24h',
              });

            this.eventDispatcher.dispatch(events.user.login, loggedUser);
        }
        return Promise.resolve({
            success: found ? true : false,
            msg: found ? 'Logged succesfully!' : 'Bad credentials?',
            token,
            data: loggedUser,
        });
    }

    public async register(user: User): Promise<CustomResponse> {

        let newUser: User;
        try {
            newUser = await this.userService.create(user);
            // this.eventDispatcher.dispatch(events.user.register, newUser);

        } catch (error) {
            if (error.name === 'QueryFailedError') {
                // email already taken
                return Promise.resolve({ success: false, msg: 'Email already taken' });
            }
            return Promise.resolve({ success: false, msg: `Error: ${error}` });
        }

        // send email with activation link
        return Promise.resolve({ success: true, msg: 'User registered, activation email has been sent', data: newUser });
    }

    public async fbLogin(user: User): Promise<CustomResponse> {

        const u = await this.userRepository.findOne({ email: user.email, fbId: user.fbId }, this.findOptions);

        // sync user data

        delete user.id;
        const x = await this.userRepository.update(u.id, user);

        const token = jwt.sign({ email: u.email }, superSecret, {
            expiresIn: '24h',
          });

        return Promise.resolve({
            success: true,
            msg: 'Logged in with facebook',
            token,
            data: u,
        });
    }

    public async fbRegister(user: User): Promise<CustomResponse> {

        let newUser: User;
        let token: string;

        try {
            user.activated = true;
            newUser = await this.userService.create(user);
            this.eventDispatcher.dispatch(events.user.register, newUser);

            token = jwt.sign({ email: newUser.email }, superSecret, {
                expiresIn: '24h',
              });

        } catch (error) {
            if (error.name === 'QueryFailedError') {
                console.log(error);
                // email already taken
                return Promise.resolve({ success: false, msg: 'Email already taken' });
            }
            return Promise.resolve({ success: false, msg: 'Unknown error :(' });
        }
        return Promise.resolve({ success: true, msg: 'User registered and activated', token, data: newUser });
    }

}

interface CustomResponse {
    success: boolean;
    msg: string;
    token?: string;
    data?: User;
}
