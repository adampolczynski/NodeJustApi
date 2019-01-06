import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Interest } from '../models/Interest';
import { User } from '../models/User';
import { InterestRepository } from '../repositories/InterestRepository';
import { events } from '../subscribers/events';

@Service()
export class InterestService {

    private findOptions: { relations: string[] } = { relations: ['activity'] };

    constructor(
        @OrmRepository() private interestRepository: InterestRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<Interest[]> {
        this.log.info('Find all interests...');
        return this.interestRepository.find({ relations: ['activity', 'user'] });
    }

    public findShared(): Promise<Interest[]> {
        this.log.info('Find all shared interests');
        return this.interestRepository.find({ where: { shared: true }, relations: ['activity', 'user'] });
    }

    public async findByUser(user: User): Promise<Interest[]> {
        this.log.info('Find all interests of the user', user.toString());
        return await this.interestRepository.find({
            where: {
                userId: user.id,
            },
            relations: ['activity'],
        });
    }

    public async findByActivityId(id: number): Promise<any> {
        this.log.info('Find interest by activity id');
        return await this.interestRepository.findOne({ activityId: id });
    }

    public findOne(id: number): Promise<Interest | undefined> {
        this.log.info('Find one interests');
        return this.interestRepository.findOne({ id });
    }

    public async share(id: number, hours?: string): Promise<Interest[]> {
        this.log.info('Sharing interest id #', id);
        console.log('Interest id' + id);
        if (hours) {
            await this.interestRepository.update(id, { shared: true, calendar: true, hours });
        } else {
            await this.interestRepository.update(id, { shared: true });
        }
        const i = await this.findOne(id);
        return await this.interestRepository.find({ where: { userId: i.userId }, relations: ['activity'] });
    }

    public async unshare(id: number): Promise<Interest[]> {
        this.log.info('Unsharing interest id #', id);
        await this.interestRepository.update(id, { shared: false });
        const i = await this.findOne(id);
        return await this.interestRepository.find({ where: { userId: i.userId }, relations: ['activity'] });
    }

    public async create(interest: Interest): Promise<Interest[]> {
        this.log.info('Create a new interest => ', interest.toString());
        const newInterest = await this.interestRepository.save(interest);
        return await this.interestRepository.find({ where: { userId: newInterest.userId }, relations: ['activity'] });
    }

    public update(id: number, interest: Interest): Promise<Interest> {
        this.log.info('Update a Interest');
        interest.id = id;
        return this.interestRepository.save(interest);
    }

    public async delete(id: number): Promise<Interest[]> {
        this.log.info('Delete a Interest');
        const interest = await this.interestRepository.findOne({ where: { id }, relations: ['activity'] });
        const userId = interest.userId;
        await this.interestRepository.delete(id);

        return await this.interestRepository.find({ where: { userId }, relations: ['activity'] });
    }

}
