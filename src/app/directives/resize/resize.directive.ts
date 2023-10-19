import { Directive, Input, ElementRef, DoCheck, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective implements DoCheck {

  @Input('relativeElement')
  relativeElement: HTMLElement;


  constructor(private elementRef: ElementRef<HTMLElement>, private renderer: Renderer2) {

  }

  ngDoCheck(): void {
    this.calculateHeight();
  }

  calculateHeight() {
    if (this.relativeElement && this.elementRef && this.elementRef.nativeElement && this.elementRef.nativeElement.parentElement) {
      const parentHeight = this.elementRef.nativeElement.parentElement.clientHeight;
      const relativeElementHeight = this.relativeElement.clientHeight;
      const height = parentHeight - relativeElementHeight;
      this.elementRef.nativeElement.style.height = `${height}px`;
    }
  }

}
