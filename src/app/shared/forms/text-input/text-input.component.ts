import { Component, Injector, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ControlValueAccessor, FormControl, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, InputTextModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  @Input() label!: string;
  @Input() type: string = "text";
  @Input() isDisabled: boolean = false;
  @Input() formControlName: string = '';

  private injector = inject(Injector);

  control!: FormControl<string>;

  onChange = (value: string) => {};
  onTouched: any = () => {};

  ngOnInit() {
    this.initializeControl();
  }

  private initializeControl() {
    const control  = this.injector.get(NgControl);
    const formGroup = this.injector.get(FormGroupDirective);

    this.control = formGroup.getControl(control as FormControlName);
  }

  handleChange() {
    this.onChange(`${this.control.value}`);
  }

  writeValue(value: string) {
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
