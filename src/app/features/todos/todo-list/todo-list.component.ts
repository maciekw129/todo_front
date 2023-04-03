import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { TodosService } from '../todos.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, TodoComponent],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoListComponent implements OnInit {
  private todosService = inject(TodosService);
  
  todos$$ = this.todosService.todos$$;

  ngOnInit(): void {
      this.todosService.getAllTodos();
  }
}
