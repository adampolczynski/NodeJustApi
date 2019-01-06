import { EntityRepository, Repository } from 'typeorm';

import { Interest } from '../models/Interest';

@EntityRepository(Interest)
export class InterestRepository extends Repository<Interest>  {

}
