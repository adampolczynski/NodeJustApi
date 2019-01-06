import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { RegisterResponse } from './responses/RegisterResponse';
import { LoginService } from '../services/LoginService';

@JsonController('/login/fb')
export class FbRegisterController {

    constructor(
        private userService: UserService,
        private loginService: LoginService
    ) { }

    @Post()
    public async register( @Body() user: any): Promise<RegisterResponse> {

        // parse fb photo
        this.parseUser(user);

        const u = await this.userService.findByEmail(user.email);
        let res;

        if (typeof u !== 'undefined') {
            res = await this.loginService.fbLogin(user);
        } else {
            res = await this.loginService.fbRegister(user);
        }

        return {
            success: res.success,
            msg: res.msg,
            data: res.data,
            token: res.token,
        };
    }

    private parseUser(fbUser: User): User {
        //const temp = JSON.parse(fbUser.fbPhoto);
        //fbUser.fbPhoto = temp.data.url;
        return fbUser;
    }

}
