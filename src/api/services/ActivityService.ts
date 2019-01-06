import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import {
    EventDispatcher,
    EventDispatcherInterface
} from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Activity } from '../models/Activity';
import { User } from '../models/User';
import { ActivityRepository } from '../repositories/ActivityRepository';
import { events } from '../subscribers/events';

@Service()
export class ActivityService {
    constructor(
        @OrmRepository() private activityRepository: ActivityRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public find(): Promise<Activity[]> {
        this.log.info('Find all Activitys');
        return this.activityRepository.find();
    }

    public findByName(name: string): Promise<Activity> {
        this.log.info('Find activity by name', name);
        return this.activityRepository.findOne({
            where: {
                name,
            },
        });
    }

    public findByUser(user: User): Promise<Activity[]> {
        this.log.info('Find all Activitys of the user', user.toString());
        return this.activityRepository.find({
            where: {
                userId: user.id,
            },
        });
    }

    public findOne(id: number): Promise<Activity | undefined> {
        this.log.info('Find all Activitys');
        return this.activityRepository.findOne({ id });
    }

    public async create(activity: Activity): Promise<Activity> {
        this.log.info('Create a new Activity => ', Activity.toString());
        return await this.activityRepository.save(activity);
    }

    public update(id: number, activity: Activity): Promise<Activity> {
        this.log.info('Update a Activity');
        activity.id = id;
        return this.activityRepository.save(activity);
    }

    public async delete(id: number): Promise<void> {
        this.log.info('Delete a Activity');
        await this.activityRepository.delete(id);
        return;
    }
}
