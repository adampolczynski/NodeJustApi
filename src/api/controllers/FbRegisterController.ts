import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { LoginService } from '../services/LoginService';
import { IResponse } from 'types/IResponse';

@JsonController('/login/fb')
export class FbRegisterController {

    constructor(
        private userService: UserService,
        private loginService: LoginService
    ) { }

    @Post()
    public async register( @Body() user: any): Promise<IResponse> {

        // parse fb photo
        user.fbPhoto = JSON.parse(user.fbPhoto).data.url;

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
}
