import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosStatefulService } from '../todos-stateful.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoPayload } from '../todos.interface';
import { TodosAPIService } from '../todos-api.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TodoComponent, ToastModule, ConfirmDialogModule, DialogModule, ButtonModule, RippleModule, TodoFormComponent],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export default class TodoListComponent implements OnInit {
  private todosStatefulService = inject(TodosStatefulService);
  private todosApiService = inject(TodosAPIService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  
  todos$$ = this.todosStatefulService.todos$$;
  isFormVisible = false;

  ngOnInit() {
      this.fetchAllTodos();
  }

  private fetchAllTodos() {
    this.todosStatefulService.fetchAllTodos();
  }
  
  private successDeleteTodo() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'You successfully deleted todo.'});
  }

  private successAddTodo() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'You successfully added todo.'});
  }

  private rejectionMessage() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong.'})
  }

  private deleteTodo(todoId: string) {
    this.todosApiService.deleteTodo(todoId).subscribe({
      next: () => {
        this.successDeleteTodo();
        this.fetchAllTodos();
      },
      error: () => {
        this.rejectionMessage();
      }
    })
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }

  addTodo(todo: TodoPayload) {
    this.todosApiService.postTodo(todo).subscribe({
      next: () => {
        this.successAddTodo();
        this.fetchAllTodos();
        this.hideForm();
      } ,
      error: () => {
        this.rejectionMessage();
      }
    })
  }

  confirmDelete(todoId: string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this todo?',
        accept: () => {
            this.deleteTodo(todoId);
        }
    });
  }

}
