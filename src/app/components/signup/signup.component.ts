import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { catchError, finalize, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { focusInvalidControl } from 'src/app/utils/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  baseForm: FormGroup;

  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  loading: boolean = false;

  constructor(public elementRef: ElementRef, private fb: FormBuilder, private authService: AuthService, private router: Router) {
    const xToken = localStorage.getItem('token');
    if (xToken) { // if already logged in. 
      this.router.navigate(['app']);
    } else {
      this.baseForm = this.fb.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required]
      })
    }
  }

  signup() {
    if (this.baseForm.valid) {
      this.loading = true;
      this.authService.post(this.baseForm.value, null, null, '/signup').pipe(take(1), finalize(()=>this.loading=false)).subscribe(response => {
        if (response.status === 'Success') {
          this.router.navigate(['login']);
        }
      });
    } else {
      focusInvalidControl(this.elementRef)
    }
  }
}
