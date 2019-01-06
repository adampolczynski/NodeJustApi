import { User } from '../../models/User';

export interface LoginResponse {
    success: boolean,
    msg: string,
    token?: string,
    data?: User
}