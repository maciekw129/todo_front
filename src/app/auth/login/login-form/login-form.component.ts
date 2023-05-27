import { Component, EventEmitter, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginForm, LoginPayload } from '../../auth.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputTextModule, ButtonModule],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Output() submitFormEvent = new EventEmitter<LoginPayload>;

  private fb = inject(NonNullableFormBuilder);

  loginForm = this.createForm();

  get emailCtrl() {
    return this.loginForm.controls.email;
  }

  get passwordCtrl() {
    return this.loginForm.controls.password;
  }

  private createForm() {
    return this.fb.group<LoginForm>({
      email: this.fb.control(''),
      password: this.fb.control('')
    })
  }

  submitForm() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) return;

    this.submitFormEvent.emit(this.loginForm.getRawValue());
  }
}
