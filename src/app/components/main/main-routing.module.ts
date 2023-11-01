import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
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
            },
            {
                path: 'chat',
                loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
