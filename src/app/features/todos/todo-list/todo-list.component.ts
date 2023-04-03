import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosService } from '../todos.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TodoComponent, ToastModule, ConfirmDialogModule, DialogModule, ButtonModule, RippleModule],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ConfirmationService]
})
export default class TodoListComponent implements OnInit {
  private todosService = inject(TodosService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  
  todos$$ = this.todosService.todos$$;
  isFormVisible = false;

  ngOnInit() {
      this.todosService.getAllTodos();
  }

  private successDeleteTodo() {
    this.messageService.add({severity:'success', summary:'Success', detail:'You successfully deleted todo.'});
  }

  private deleteTodo(todoId: string) {
    this.todosService.deleteTodo(todoId).subscribe({
      next: () => this.successDeleteTodo()
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

  showForm() {
    this.isFormVisible = true;
  }
}
