import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler, router: Router = inject(Router), authService:AuthService = inject(AuthService)): Observable<HttpEvent<any>> {
        const xToken = localStorage.getItem('token');
        if (xToken) {
            req = req.clone({headers: req.headers.set('x-token', xToken)})
        }
        return next.handle(req)
        .pipe(catchError((response) => {
            if (response instanceof HttpErrorResponse && response.status === 401) {
                return authService.logout().pipe(switchMap((res)=>{
                    if(res && res.status && res.status.toUpperCase() === 'SUCCESS'){
                        router.navigate(['login']);
                    }
                    return throwError(response);
                }));
            } else {
                return throwError(response);
            }
        }));
    }

}