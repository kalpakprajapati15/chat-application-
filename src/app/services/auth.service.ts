
import { User } from "../models/user.model";
import { ApiService } from "./api.service";
import { Injectable, Injector } from '@angular/core'

@Injectable({ providedIn: "root" })
export class AuthService extends ApiService<User> {

    url: string = 'login';

    constructor(private injector: Injector) {
        super(injector);
    }
}