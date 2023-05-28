import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoForm, TodoPayload } from '../todos.interface';
import { LoaderState } from 'src/app/shared/loader/loader.interface';
import { NgIf } from '@angular/common';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { ErrorHandlerDirective } from 'src/app/shared/directives/error-handler.directive';
import { TextInputComponent } from 'src/app/shared/forms/text-input/text-input.component';
import { TextAreaComponent } from 'src/app/shared/forms/text-area/text-area.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    NgIf,
    LoaderComponent,
    ErrorHandlerDirective,
    TextInputComponent,
    TextAreaComponent,
  ],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  @Input() loaderState: LoaderState = { status: 'initial' };
  @Output() submitFormEvent = new EventEmitter<TodoPayload>();

  private fb = inject(NonNullableFormBuilder);

  todoForm = this.createForm();

  private createForm() {
    return this.fb.group<TodoForm>({
      todoName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      todoDescription: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      }),
    });
  }

  submitForm() {
    this.todoForm.markAllAsTouched();
    if (this.todoForm.invalid) return;

    this.submitFormEvent.emit(this.todoForm.getRawValue());
  }
}
