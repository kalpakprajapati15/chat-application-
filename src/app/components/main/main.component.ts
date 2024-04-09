import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { Logout } from 'src/app/states/auth.state';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    constructor(private actions$: Actions, private router: Router) {
        this.actions$.pipe(ofActionSuccessful(Logout), takeUntilDestroyed()).subscribe(() => {
            this.router.navigate(['login']);
        })
    }
}
