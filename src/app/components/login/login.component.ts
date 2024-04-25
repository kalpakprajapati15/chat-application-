import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { focusInvalidControl } from 'src/app/utils/utils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  baseForm: FormGroup;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  loading: boolean = false;

  constructor(public elementRef: ElementRef, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    const xToken = localStorage.getItem('token');
    if (xToken) { // if already logged in. 
      this.router.navigate(['app']);
    } else {
      this.baseForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required]
      })
    }
  }

  login() {
    if (this.baseForm.valid) {
      this.loading = true;
      this.authService.post<{ email: string, token: string }>(this.baseForm.value, null, null, '/login').pipe(take(1), finalize(()=>this.loading = false)).subscribe(response => {
        if (response.status === 'Success') {
          localStorage.setItem('email', response.result.email);
          localStorage.setItem('token', response.result.token);
          this.router.navigate(['app']);
        }
      });
    } else {
      focusInvalidControl(this.elementRef)
    }
  }
}
