import {
    Authorized, Body,  Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { InterestNotFoundError } from '../errors/InterestNotFoundError';
import { Interest } from '../models/Interest';
import { InterestService } from '../services/InterestService';
import { UserService } from '../services/UserService';
import { ActivityService } from '../services/ActivityService';

import { IResponse } from 'types/IResponse';

@JsonController('/interests')
export class InterestController {

    constructor(
        private interestService: InterestService,
        private userService: UserService,
        private activityService: ActivityService
    ) { }

    @Get()
    public async find(): Promise<IResponse> {

        const a = await this.interestService.find();

        return Promise.resolve({
            success: true,
            data: a,
        });
    }

    @Get('/shared')
    public async findShared(): Promise<IResponse> {

        const a = await this.interestService.findShared();

        return Promise.resolve({
            success: true,
            data: a,
        });
    }

    @Get('/shared/:id')
    public async unshare( @Param('id') id: number): Promise<IResponse> {

        const a = await this.interestService.unshare(id);

        return Promise.resolve({
            success: true,
            data: a,
        });
    }

    @Get('/share/:id')
    @OnUndefined(InterestNotFoundError)
    public async share( @Param('id') id: number): Promise<IResponse> {

        await this.interestService.share(id);
        const data = await this.interestService.findShared();

        return {
            success: true,
            data,
        };
    }

    @Post('/share/calendar')
    @OnUndefined(InterestNotFoundError)
    public async shareCalendar( @Body() data: any): Promise<IResponse> {

        const id = data.id;

        // const hours = ((data.hours.replace('[', '')).replace(']', '')).split(',');
        const hours = data.hours;

        await this.interestService.share(id, hours);
        const interests = await this.interestService.findShared();

        return {
            success: true,
            data: interests,
        };
    }

    @Get('/:email')
    @OnUndefined(InterestNotFoundError)
    public async one( @Param('email') email: string): Promise<IResponse> {

        const u = await this.userService.findByEmail(email);

        const data = await this.interestService.findByUser(u);

        return {
            success: true,
            data,
        };
    }

    @Post()
    public async create( @Body() data: any): Promise<IResponse> {

        console.log(data);
        const user = await this.userService.findByEmail(data.email);
        const activity = await this.activityService.findByName(data.name);

        if (typeof await this.interestService.findByActivityId(activity.id) !== 'undefined') {
            throw new Error('erroro');
        }

        const interest = new Interest();
        interest.activityId = activity.id;
        interest.userId = user.id;

        const d = await this.interestService.create(interest);

        return {
            success: true,
            data: d,
        };
    }

    @Put('/:id')
    public async update( @Param('id') id: number, @Body() interest: Interest): Promise<IResponse> {

        return {
            data: await this.interestService.update(id, interest),
            success: true
        }
    }

    @Delete('/:id')
    public async delete( @Param('id') id: number): Promise<IResponse> {

        const d = await this.interestService.delete(id);
        return {
            success: true,
            data: d,
        };
    }

}
