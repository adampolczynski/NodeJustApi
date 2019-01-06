import { HttpError } from 'routing-controllers';

export class ActivityNotFoundError extends HttpError {
    constructor() {
        super(404, 'Activity not found!');
    }
}
