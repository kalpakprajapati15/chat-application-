import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { Logout } from 'src/app/states/auth.state';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
    destroyed$: Subject<boolean> = new Subject();

    constructor(private actions$: Actions, private router: Router) {
        this.actions$.pipe(ofActionDispatched(Logout), takeUntil(this.destroyed$)).subscribe(() => {
            this.router.navigate(['login']);
        })
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
    }
}
