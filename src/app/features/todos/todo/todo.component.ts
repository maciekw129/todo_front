import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TodoAPI } from '../todos.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService } from 'primeng/api';
import { TodoStatefulService } from './todo-stateful.service';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todo[todo]',
  standalone: true,
  imports: [DatePipe, CardModule, ButtonModule, RippleModule, LoaderComponent, NgIf, AsyncPipe, ConfirmDialogModule],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, TodoStatefulService]
})
export class TodoComponent {
  @Input() todo!: TodoAPI;

  @Output() deleteTodoEvent = new EventEmitter<string>;
  @Output() completeTodoEvent = new EventEmitter<string>;
  @Output() errorEvent = new EventEmitter<void>;

  private todoStatefulService = inject(TodoStatefulService);
  private confirmationService = inject(ConfirmationService);

  deleteTodoLoader$$ = this.todoStatefulService.selectDeleteTodoLoader().pipe(
    tap(({ status }) => {
      if(status === 'success') this.deleteTodoEvent.emit(this.todo.id);
      if(status === 'rejected') this.errorEvent.emit();
    })
  );
  completeTodoLoader$$ = this.todoStatefulService.selectCompleteTodoLoader().pipe(
    tap(({ status }) => {
      if(status === 'success')  this.completeTodoEvent.emit(this.todo.id);
      if(status === 'rejected') this.errorEvent.emit();
    })
  )

  private deleteTodo() {
    this.todoStatefulService.deleteTodo(this.todo.id);
  }

  private completeTodo() {
    this.todoStatefulService.completeTodo(this.todo.id);
  }

  confirmDeleteTodo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this todo?',
      accept: () => this.deleteTodo()
    });
  }

  confirmCompleteTodo() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to complete this todo?',
      accept: () => this.completeTodo()
    });
  }
}
