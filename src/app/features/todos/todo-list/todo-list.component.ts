import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosStatefulService } from '../todos-stateful.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoPayload } from '../todos.interface';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { distinctUntilKeyChanged, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TodoComponent, ToastModule, DialogModule, ButtonModule, RippleModule, TodoFormComponent, LoaderComponent, KeyValuePipe],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export default class TodoListComponent implements OnInit {
  private todosStatefulService = inject(TodosStatefulService);
  private messageService = inject(MessageService);
  
  isFormVisible = false;
  todos$$ = this.todosStatefulService.selectTodos$$;
  getAllTodosLoader$$ = this.todosStatefulService.selectGetAllTodosLoader$$;
  addTodoLoader$$ = this.todosStatefulService.selectAddTodoLoader$$.pipe(
    distinctUntilKeyChanged(('status')),
    tap(({ status }) => {
      if(status === 'success') this.showSuccessAddTodo();
      if(status === 'rejected') this.showRejectionMessage();
    })
  );

  ngOnInit() {
    this.todosStatefulService.fetchAllTodos();
  }
  
  private showSuccessAddTodo() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'You successfully added todo.'});
    this.hideForm();
  }
  
  private showRejectionMessage() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong.'})
  }
  
  showSuccessDeleteTodo() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'You successfully deleted todo.'});
    this.hideForm();
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }

  addTodo(todo: TodoPayload) {
    this.todosStatefulService.addTodo(todo);
  }
}
