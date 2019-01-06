import { EntityRepository, Repository } from 'typeorm';

import { Activity } from '../models/Activity';

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity>  {

}
