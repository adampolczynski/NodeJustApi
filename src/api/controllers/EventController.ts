import {
    Authorized, Body,  Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { Event } from '../models/Event';
import { EventService } from '../services/EventService';
import { UserService } from '../services/UserService';
import { ActivityService } from '../services/ActivityService';

import { EventResponse } from '../controllers/responses/EventResponse';

@JsonController('/Events')
export class EventController {

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private activityService: ActivityService
    ) { }

    @Get()
    public async find(): Promise<any> {

        const a = await this.eventService.find();

        return Promise.resolve({
            success: true,
            data: a,
        });
    }

    @Get('/:email')
    public async one( @Param('email') email: string): Promise<EventResponse> {

        const u = await this.userService.findByEmail(email);

        const data = await this.eventService.find();

        return {
            success: true,
            data,
        };
    }

    @Post()
    public async create( @Body() data: any): Promise<EventResponse> {

        const d = await this.eventService.create(data);

        return {
            success: true,
            data: d,
        };
    }

    @Put('/:id')
    public update( @Param('id') id: number, @Body() event: Event): Promise<Event> {
        return this.eventService.update(id, event);
    }

    @Delete('/:id')
    public async delete( @Param('id') id: number): Promise<EventResponse> {

        const d = await this.eventService.delete(id);
        return {
            success: true,
            data: d,
        };
    }

}
