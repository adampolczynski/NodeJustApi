import { User } from '../../models/User';

export interface RegisterResponse {
    success: boolean,
    msg: string,
    token?: string,
    data: User
}