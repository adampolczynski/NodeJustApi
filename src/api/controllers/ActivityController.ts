import {
    Authorized, Body,  Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { ActivityNotFoundError } from '../errors/ActivityNotFoundError';
import { Activity } from '../models/Activity';
import { ActivityService } from '../services/ActivityService';

//@Authorized()
@JsonController('/activities')
export class ActivityController {

    constructor(
        private activityService: ActivityService
    ) { }


    @Get()
    public async find(): Promise<any> {

        const a = await this.activityService.find();

        return Promise.resolve({
            success: true,
            data: a,
        });
    }

    @Get('/:id')
    @OnUndefined(ActivityNotFoundError)
    public one( @Param('id') id: number): Promise<Activity | undefined> {
        return this.activityService.findOne(id);
    }

    @Post()
    public create( @Body() activity: Activity): Promise<Activity> {
        return this.activityService.create(activity);
    }

    @Put('/:id')
    public update( @Param('id') id: number, @Body() activity: Activity): Promise<Activity> {
        return this.activityService.update(id, activity);
    }

    @Delete('/:id')
    public delete( @Param('id') id: number): Promise<void> {
        return this.activityService.delete(id);
    }

}
