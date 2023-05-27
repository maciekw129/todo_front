import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RegisterForm, RegisterPayload } from '../../auth.interface';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, InputTextModule, ButtonModule, TextInputComponent],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  @Output() submitFormEvent = new EventEmitter<RegisterPayload>;

  private fb = inject(NonNullableFormBuilder);

  registerForm = this.createForm();

  get emailCtrl() {
    return this.registerForm.controls.email;
  }

  get passwordCtrl() {
    return this.registerForm.controls.password;
  }

  private createForm() {
    return this.fb.group<RegisterForm>({
      email: this.fb.control(''),
      password: this.fb.control(''),
      firstname: this.fb.control('', {validators: Validators.required}),
      lastname: this.fb.control('')
    })
  }

  ngOnInit() {
    // this.registerForm.controls.firstname.valueChanges.subscribe(console.log);
    // this.registerForm.controls.email.valueChanges.subscribe(console.log);
  }

  submitForm() {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.invalid) return;

    this.submitFormEvent.emit(this.registerForm.getRawValue());
  }
}
