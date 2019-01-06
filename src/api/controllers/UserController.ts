import {
    Authorized, Body, CurrentUser, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { IResponse } from 'types/IResponse';

// @Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
//    public find( @CurrentUser() user?: User): Promise<User[]> {
    public async find( user?: User): Promise<IResponse> {
        return { 
            success: true,
            data: await this.userService.find(),
        }
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public async one( @Param('id') id: number): Promise<IResponse> {
        return {
            success: true,
            data: await this.userService.findOne(id)
        }
    }

    @Post()
    public async create( @Body() user: User): Promise<IResponse> {
        return {
            success: true,
            data: await this.userService.create(user)
        }
    }

    @Put('/:id')
    public async update( @Param('id') id: number, @Body() user: User): Promise<IResponse> {
        return {
            success: true,
            data: await this.userService.update(id, user)
        }
    }

    @Delete('/:id')
    public async delete( @Param('id') id: number): Promise<void> {
        return this.userService.delete(id);
    }

}
