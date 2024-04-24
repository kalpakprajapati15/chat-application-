
import { tap } from "rxjs";
import { User } from "../models/user.model";
import { ApiService } from "./api.service";
import { Injectable, Injector } from '@angular/core'

@Injectable({ providedIn: "root" })
export class AuthService extends ApiService<User> {

    url: string = 'auth';

    constructor(private injector: Injector) {
        super(injector);
    }

    logout() {
        const currentEmail = localStorage.getItem('email');
        return this.post({email: currentEmail}, null, null, '/logout').pipe(tap((res)=>{
            if(res && res.status && res.status.toUpperCase() === 'SUCCESS'){
                localStorage.removeItem('token');
                localStorage.removeItem('email');
            }
        }));
    }
}