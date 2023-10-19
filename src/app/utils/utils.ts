import { ElementRef } from '@angular/core'
export function focusInvalidControl(element: ElementRef) {
    const invalidElements = element.nativeElement.querySelectorAll('[formControlName].ng-invalid');
    if (invalidElements.length) {
        let elementFocused: boolean = false;
        for (let index = 0; index < invalidElements.length; index++) {
            const element = invalidElements[index];
            if ('focus' in element && element.tabIndex !== -1 && !elementFocused) {
                element.focus();
                elementFocused = true;
            }
            element.classList.add('ng-touched');
        }
    }
}

export class ErrorMessage {
    static email = 'Entered email is not valid';
    static required = 'This field is required';
}