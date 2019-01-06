import { Event } from '../../models/Event';

export interface EventResponse {
    success: boolean;
    token?: string;
    data: Event[];
}
