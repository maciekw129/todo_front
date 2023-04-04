import { Component, EventEmitter, inject, Output, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TodoForm, TodoPayload } from '../todos.interface';
import { LoaderState } from 'src/app/shared/loader/loader.interface';
import { NgIf } from '@angular/common';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, ButtonModule, ReactiveFormsModule, NgIf, LoaderComponent],
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  @Input() loaderState: LoaderState = { status: 'initial' };
  @Output() submitFormEvent = new EventEmitter<TodoPayload>;

  private fb = inject(NonNullableFormBuilder);

  todoForm = this.createForm();

  get todoNameCtrl() {
    return this.todoForm.controls.todoName
  }

  get todoDescriptionCtrl() {
    return this.todoForm.controls.todoDescription
  }

  private createForm() {
    return this.fb.group<TodoForm>({
      todoName: this.fb.control(''),
      todoDescription: this.fb.control('')
    });
  }

  submitForm() {
    this.todoForm.markAllAsTouched();
    if(this.todoForm.invalid) return;

    this.submitFormEvent.emit(this.todoForm.getRawValue());
  }
}
