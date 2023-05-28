import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm, LoginPayload } from '../../auth.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputTextModule, ButtonModule, TextInputComponent],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Output() submitFormEvent = new EventEmitter<LoginPayload>;

  private fb = inject(NonNullableFormBuilder);

  loginForm = this.createForm();

  private createForm() {
    return this.fb.group<LoginForm>({
      email: this.fb.control('', {
        validators: Validators.required
      }),
      password: this.fb.control('', {
        validators: Validators.required
      })
    })
  }

  submitForm() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;

    this.submitFormEvent.emit(this.loginForm.getRawValue());
  }
}
