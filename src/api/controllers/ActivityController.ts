import {
    Authorized, Body,  Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ActivityNotFoundError } from '../errors/ActivityNotFoundError';
import { Activity } from '../models/Activity';
import { ActivityService } from '../services/ActivityService';
import { IResponse } from 'types/IResponse';

//@Authorized()
@JsonController('/activities')
export class ActivityController {

    constructor(
        private activityService: ActivityService
    ) { }


    @Get()
    public async find(): Promise<IResponse> {

        const a = await this.activityService.find();

        return Promise.resolve({
            success: true,
            data: a,
        });
    }

    @Get('/:id')
    @OnUndefined(ActivityNotFoundError)
    public async one( @Param('id') id: number): Promise<IResponse> {
        return {
            success: true,
            data: await this.activityService.findOne(id)
        }
    }

    @Post()
    public async create( @Body() activity: Activity): Promise<IResponse> {
        return {
            success: true,
            data: await this.activityService.create(activity)
        }
    }

    @Put('/:id')
    public async update( @Param('id') id: number, @Body() activity: Activity): Promise<IResponse> {
        return {
            success: true,
            data: await this.activityService.update(id, activity)
        }
    }

    @Delete('/:id')
    public delete( @Param('id') id: number): Promise<void> {
        return this.activityService.delete(id);
    }

}
