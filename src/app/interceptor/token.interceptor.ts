import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const xToken = localStorage.getItem('token');
        if (xToken) {
            req = req.clone({headers: req.headers.set('x-token', xToken)})
        }
        return next.handle(req);
    }

}