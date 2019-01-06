import { HttpError } from 'routing-controllers';

export class InterestNotFoundError extends HttpError {
    constructor() {
        super(404, 'Interest not found!');
    }
}
