import { Directive, HostBinding, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[errorHandler][formControlName]'
})
export class ErrorHandlerDirective {
  private control = inject(NgControl);
  
  @HostBinding('class.ng-dirty') get checkDirty() {
    return this.control.touched;
  }

  @HostBinding('class.ng-invalid') get checkInvalid() {
    return this.control.invalid;
  }
}
