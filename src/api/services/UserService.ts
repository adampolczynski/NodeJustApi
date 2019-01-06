import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

import * as jwt from 'jsonwebtoken';

const superSecret = 'superSecret';

@Service()
export class UserService {

    private findOptions = { relations: ['interests', 'interests.activity'] };

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find(this.findOptions); // relations: ['interests']
    }

    public findOne(id: number): Promise<User | undefined> {
        this.log.info('Find user by id');
        return this.userRepository.findOne({ id }, this.findOptions);
    }

    public findByEmail(email: string): Promise<User> {
        this.log.info('Find user by email');
        return this.userRepository.findOne({ email }, this.findOptions);
    }

    public async create(user: User): Promise<User> {

        this.log.info('Create a new user => ', user);
        let newUser = await this.userRepository.save(user);
        newUser = await this.findByEmail(user.email);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return Promise.resolve(newUser);
    }

    // public login(data: { email: string, password: string }): Promise<User> {
    //     this.log.info(`Login user ${data.email}`);
    //     this.userRepository.findOne({ email: data.email, password: data.password }, this.findOptions);
    //     return
    // }

    public async delete(id: number): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
    }

    public update(id: number, user: User): Promise<User> {
        this.log.info('Update a user');
        user.id = id;
        return this.userRepository.save(user);
    }

}

// const key = "secretda12341234";

// function decrypt(key, data) {

//     console.log(data)
//     console.log(Buffer.from(data, 'base64').byteLength)
//     console.log(Buffer.from(data, 'base64').toString('binary', 0, 16))
//     console.log(Buffer.from(data, 'base64').slice(0, 16).toString('ascii'))

//     let iv = Buffer.alloc(16);

//     const crypto = require('crypto');
//     const decipher = crypto.createDecipheriv('aes-128-cbc', data, iv);

//     console.log(decipher)
//     let decrypted = '';
//     decipher.on('readable', () => {
//       const data = decipher.read();
//       if (data)
//         decrypted += data.toString('utf8');
//     });
//     decipher.on('end', () => {
//       console.log(decrypted);
//       // Prints: some clear text data
//     });

//     const encrypted =
//         'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
//     decipher.write(encrypted, 'hex');
//     decipher.end();
//     return decrypted;
// }

interface CustomResponse {
    success: boolean;
    msg: string;
    token?: string;
    data?: User;
}
