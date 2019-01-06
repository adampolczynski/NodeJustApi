import { EntityRepository, Repository } from 'typeorm';

import { Event } from '../models/Event';

@EntityRepository(Event)
export class EventRepository extends Repository<Event>  {

}
