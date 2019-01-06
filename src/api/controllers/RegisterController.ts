import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { LoginService } from '../services/LoginService';
import { IResponse } from 'types/IResponse';

@JsonController('/register')
export class RegisterController {

    constructor(
        private loginService: LoginService
    ) { }

    @Post()
    public async register( @Body() user: User): Promise<IResponse> {

        const res = await this.loginService.register(user);

        return {
            success: res.success,
            msg: res.msg,
            data: res.data,
        };
    }

}
