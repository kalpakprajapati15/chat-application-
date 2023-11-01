import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";
import { PostSocketService } from "../services/post-socket.service";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

export interface AuthStateModel {
    token: string | null;
    email: string | null;
    name: string | null;
    user: User | null;
    socketId: string | null;
}

export class Login { // Action with payload.
    static readonly type = '[Auth] Login'
    constructor(public payload: { email: string; password: string, socketId: string }) {

    }
}

export class Logout {
    static readonly type = '[Auth] Logout';
}

export class SetSocket {
    static readonly type = '[Auth] SetSocket'
    constructor(public socketId: string) {

    }
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        email: null,
        token: null,
        name: null,
        socketId: null,
        user: null
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

    @Selector()
    static loginName(state: AuthStateModel): string {
        return state.name;
    }

    @Selector()
    static socketId(state: AuthStateModel): string {
        return state.socketId;
    }

    constructor(private authService: AuthService, private postSocketService: PostSocketService, private userService: UserService) { }

    @Action(Login)
    doLogin(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.post<{ email: string, token: string, name: string, user: User }>(action.payload).pipe(tap(response => {
            if (response.status === "Success") {
                ctx.patchState({
                    email: response.result.email,
                    token: response.result.token,
                    name: response.result.name,
                    user: response.result.user
                });
            }
        }));
    }

    @Action(Logout)
    doLogout(ctx: StateContext<AuthStateModel>) {
        return this.authService.post({ email: ctx.getState().email }, null, null, 'logout').pipe(tap((response: any) => {
            ctx.setState({
                email: null,
                token: null,
                name: null,
                socketId: ctx.getState().socketId,
                user: null
            });
        }))
    }

    @Action(SetSocket)
    setSocket(ctx: StateContext<AuthStateModel>, action: SetSocket) {
        if (ctx.getState().token) {
            return this.userService.post({ socketId: action.socketId }, null, null, null, '/setSocketId').pipe(tap(() => {
                ctx.patchState({
                    socketId: action.socketId
                })
            }))
        } else {
            return ctx.patchState({
                socketId: action.socketId
            })
        }
    }
}