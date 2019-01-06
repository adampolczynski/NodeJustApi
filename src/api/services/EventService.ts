import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Event } from '../models/Event';
import { User } from '../models/User';
import { EventRepository } from '../repositories/EventRepository';
import { events } from '../subscribers/events';

@Service()
export class EventService {

    private findOptions: { relations: string[] } = { relations: ['creator', 'users'] };

    constructor(
        @OrmRepository() private eventRepository: EventRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Event[]> {
        this.log.info('Find all Events');
        return this.eventRepository.find(this.findOptions);
    }

    public findOne(id: number): Promise<Event | undefined> {
        this.log.info('Find all Events');
        return this.eventRepository.findOne({ id });
    }

    public async create(event: Event): Promise<Event[]> {
        this.log.info('Create a new Event => ', event.toString());
        const newEvent = await this.eventRepository.save(event);
        return await this.eventRepository.find(this.findOptions);
    }

    public update(id: number, event: Event): Promise<Event> {
        this.log.info('Update a Event');
        event.id = id;
        return this.eventRepository.save(event);
    }

    public async delete(id: number): Promise<Event[]> {
        this.log.info('Delete a Event');
        const event = await this.eventRepository.findOne({ where: { id }});
        const userId = event.users;
        await this.eventRepository.delete(id);

        return await this.eventRepository.find({ where: { userId }});
    }

}
