import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { AuthState } from "../states/auth.state";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, router: Router = inject(Router), store: Store = inject(Store)) => {
    const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);
    if (!isAuthenticated) {
        router.navigate(['login']);
    }
    return isAuthenticated;
}