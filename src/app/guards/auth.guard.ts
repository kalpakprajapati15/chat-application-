import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, router: Router = inject(Router)) => {
    const xToken = localStorage.getItem('token');
    if (xToken) {
        return true;
    }
    router.navigate(['login']);
    return false;
}