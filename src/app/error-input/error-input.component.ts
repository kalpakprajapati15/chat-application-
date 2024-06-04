import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BehaviorSubject, Subscription, distinctUntilChanged, fromEvent, merge } from 'rxjs';
import { FORM_ERRORS } from '../app.module';

@Component({
  selector: 'app-error-input',
  templateUrl: './error-input.component.html',
  styleUrls: ['./error-input.component.scss'],
})
export class ErrorInputComponent implements AfterViewInit, OnDestroy {

  formGroupDirective = inject(FormGroupDirective);
  @Input()
  controlName: string;
  errors = inject(FORM_ERRORS);
  message$ = new BehaviorSubject<string>('');
  subscription: Subscription;

  @ViewChild('inputRef')
  inputRef: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    if (this.formGroupDirective && this.inputRef) {
      const control = this.formGroupDirective.control.get(this.controlName);
      const blurEvent = fromEvent(this.inputRef.nativeElement, 'blur');
      if (control) {
        this.subscription = merge(control.valueChanges.pipe(distinctUntilChanged()), blurEvent)
          .subscribe((val) => {
            const controlErrors = control.errors;
            console.log(val,"calles")
            if (controlErrors) {
              const firstKey = Object.keys(controlErrors)[0];
              const getError = this.errors[firstKey];
              // Get message from the configuration
              const text = getError(controlErrors[firstKey]);


              // Set the error based on the configuration
              this.setError(text);
            } else {
              this.setError('');
            }
          });
      }
    }
  }

  setError(text: string) {
    this.message$.next(text);
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
