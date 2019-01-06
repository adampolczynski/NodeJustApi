import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { LoginService } from '../services/LoginService';
import { LoginResponse } from './responses/LoginResponse';
import { UserService } from '../services/UserService';
import { ILoginData } from '../../../types/ILoginData';

@JsonController('/login')
export class LoginController {

    constructor(
        private loginService: LoginService,
        private userService: UserService
    ) { }

    @Post()
    public async login( @Body() data: ILoginData): Promise<LoginResponse> {

        const response = await this.loginService.login(data);

        return response;
    }

}
