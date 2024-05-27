import { Injectable, NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, PreloadingStrategy, Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { Observable, of } from 'rxjs';
import { FeedComponent } from './components/main/feed/feed.component';
import { MainComponent } from './components/main/main.component';
@Injectable({
  providedIn: 'root'
})export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Custom logic to decide if the route should be preloaded
    return route.data && route.data['preload'] ? load() : of(null);
  }
}

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: "app",
    // loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
    component: MainComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'feed'
        },
        {
            path: 'feed',
            component: FeedComponent,
            canActivate: [AuthGuard]
        }
    ],
    data: {preload: false},
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: CustomPreloadingStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
