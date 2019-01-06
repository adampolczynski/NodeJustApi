import { Interest } from '../../models/Interest';

export interface InterestResponse {
    success: boolean;
    token?: string;
    data: Interest[];
}
