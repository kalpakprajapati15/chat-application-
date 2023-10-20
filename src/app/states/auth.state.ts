import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";

export interface AuthStateModel {
    token: string | null;
    email: string | null;
}

export class Login { // Action with payload.
    static readonly type = '[Auth] Login'
    constructor(public payload: { email: string; password: string }) {

    }
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        email: null,
        token: null
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    static email(state: AuthStateModel): string | null {
        return state.email;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.token;
    }

    constructor(private authService: AuthService) { }

    @Action(Login)
    doLogin(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.post<{ email: string, token: string }>(action.payload).pipe(tap(response => {
            if (response.status === "Success") {
                ctx.patchState({
                    email: response.result.email,
                    token: response.result.token
                });
            }
        }));
    }

    @Action(Logout)
    doLogout(ctx: StateContext<AuthStateModel>) {
        ctx.setState({
            email: null,
            token: null
        });
    }
}