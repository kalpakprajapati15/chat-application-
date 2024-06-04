import { Directive, ElementRef, AfterViewInit, OnDestroy, HostListener, Input } from '@angular/core';
import { FormControlName } from '@angular/forms'
import { Tooltip } from 'primeng/tooltip';
import { Subscription } from 'rxjs'
import { ErrorMessage } from 'src/app/utils/utils';
@Directive({
  selector: '[appTooltipError]'
})
export class TooltipErrorDirective implements AfterViewInit, OnDestroy {

  statusChangeSubscription: Subscription;


  // @HostListener('focus')
  // onFocus() {
  //   if (this.formControlName.control.status === 'INVALID') {
  //     if (this.formControlName.control.errors['required']) {
  //       this.tooltip.setOption({ 'tooltipLabel': 'This field is required' });
  //       this.tooltip.text = 'This field is required';
  //       this.tooltip.show();
  //     }
  //   } else {
  //     this.tooltip.text = null;
  //     this.tooltip.setOption({ 'tooltipLabel': null });
  //     this.tooltip.hide();
  //   }
  // }

  // @HostListener('blur')
  // onBlur() {
  //   this.tooltip.text = null;
  //   this.tooltip.setOption({ 'tooltipLabel': null });
  //   this.tooltip.hide();
  // }


  constructor(private tooltip: Tooltip, private formControlName: FormControlName) {

  }

  ngAfterViewInit(): void {
    this.statusChangeSubscription = this.formControlName.control.statusChanges.pipe().subscribe((val) => {
      console.log(val);
      if (val === 'INVALID') {
        let errorText: string = '';
        Object.keys(this.formControlName.control.errors).forEach((oVal: string) => {

          // @ts-ignore
          errorText += ErrorMessage[oVal];
        });
        this.tooltip.setOption({ 'tooltipLabel': `${errorText}` });
        this.tooltip.text = `${errorText}`;
        this.tooltip.show();
      } else {
        this.tooltip.text = null;
        this.tooltip.setOption({ 'tooltipLabel': null });
        this.tooltip.hide();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusChangeSubscription) {
      this.statusChangeSubscription.unsubscribe();
    }
  }

}






