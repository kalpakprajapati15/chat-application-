import { Component, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthState, Login } from 'src/app/states/auth.state';
import { focusInvalidControl } from 'src/app/utils/utils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  baseForm: FormGroup;

  destroyed$: Subject<boolean> = new Subject();

  constructor(public elementRef: ElementRef, private fb: FormBuilder, private store: Store, private router: Router, private actions$: Actions) {

    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (isAuthenticated) {
      this.router.navigate(['app']);
    } else {
      this.baseForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required]
      })

      this.actions$.pipe(takeUntil(this.destroyed$), ofActionSuccessful(Login)).subscribe(() => {
        this.router.navigate(['app']);
      })
    }
  }

  login() {
    if (this.baseForm.valid) {
      const socketId = this.store.selectSnapshot(AuthState.socketId)
      this.store.dispatch(new Login({ password: this.baseForm.value.password, email: this.baseForm.value.email, socketId: socketId }));
      // this.authService.post<{ email: string, token: string }>(this.baseForm.value).pipe(take(1)).subscribe(response => {
      //   if (response.status === 'Success') {
      //     localStorage.setItem('email', response.result.email);
      //     localStorage.setItem('token', response.result.token);
      //     this.router.navigate(['app']);
      //   }
      // });
    } else {
      focusInvalidControl(this.elementRef)
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
