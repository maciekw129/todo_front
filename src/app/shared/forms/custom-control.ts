import { Directive, Injector, Input, OnInit, inject } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';

@Directive()
export abstract class CustomControl<T> implements ControlValueAccessor, OnInit {
  @Input() formControlName!: string;
  @Input() type: string = 'text';
  @Input() isDisabled: boolean = false;

  private injector = inject(Injector);

  control!: FormControl<T>;

  onChange = (value: T) => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.validateRequiredInputs();
    this.initializeControl();
  }

  private validateRequiredInputs() {
    if (!this.formControlName)
      throw new Error(
        "Input 'formControlName' is required in custom-control based components."
      );
  }

  private initializeControl() {
    const control = this.injector.get(NgControl);
    const formGroup = this.injector.get(FormGroupDirective);

    this.control = formGroup.getControl(control as FormControlName);
  }

  handleChange() {
    this.onChange(this.control.value);
  }

  writeValue(value: T) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    disabled ? this.control.disable() : this.control.enable();
  }
}
