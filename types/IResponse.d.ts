import { User } from "src/api/models/User";
import { Interest } from "src/api/models/Interest";
import { Localization } from "src/api/models/Localization";
import { Activity } from "src/api/models/Activity";

export interface IResponse {
    success: boolean,
    msg?: string,
    token?: string,
    data?: User | User[] | Interest | Interest[] | Localization | Localization[] | Activity | Activity[]
}