
import { User } from "../models/user.model";
import { ApiService } from "./base/api.service";
import { Injectable, Injector } from '@angular/core'

@Injectable({ providedIn: "root" })
export class UserService extends ApiService<User> {

    url: string = 'user';

    constructor(private injector: Injector) {
        super(injector);
    }
}