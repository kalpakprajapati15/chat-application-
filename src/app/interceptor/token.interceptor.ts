import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngxs/store";
import { Observable, catchError, tap, throwError } from "rxjs";
import { inject } from '@angular/core'
import { AuthState, Logout } from "../states/auth.state";
import { Router } from "@angular/router";

export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler, store: Store = inject(Store)): Observable<HttpEvent<any>> {
        const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);
        if (isAuthenticated) {
            const xToken = store.selectSnapshot(AuthState.token)
            req = req.clone({ headers: req.headers.set('x-token', xToken) })
        }
        return next.handle(req).pipe(catchError((response) => {
            if (response instanceof HttpErrorResponse && response.status === 401) {
                store.dispatch(new Logout());
            }
            return throwError(response);
        }));
    }

}