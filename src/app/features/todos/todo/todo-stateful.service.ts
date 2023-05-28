import { Injectable, inject } from '@angular/core';
import { TodosAPIService } from '../todos-api.service';
import { map } from 'rxjs';
import { TodoState } from '../todos.interface';
import { StatefulService } from 'src/app/shared/services/stateful-service';

@Injectable()

export class TodoStatefulService extends StatefulService<TodoState> {
  private todosApiService = inject(TodosAPIService);

  constructor() {
    super({
      deleteTodoLoader: { status: 'initial' },
      completeTodoLoader: { status: 'initial' }
    })
  }

  get todoState$$() {
    return this._state$$.asObservable();
  }

  selectDeleteTodoLoader() {
    return this.todoState$$.pipe(map(state => state.deleteTodoLoader));
  }

  selectCompleteTodoLoader() {
    return this.todoState$$.pipe(map(state => state.completeTodoLoader));
  }

  completeTodo(todoId: string) {
    this.patchState({ completeTodoLoader: { status: 'pending' }});

    this.todosApiService.patchTodo(todoId, { completed: true }).subscribe({
      next: () => {
        this.patchState({ completeTodoLoader: { status: 'success' }});
      },
      error: () => {
        this.patchState({ deleteTodoLoader: { status: 'rejected' }});
      }
    })
  }

  deleteTodo(todoId: string) {
    this.patchState({ deleteTodoLoader: { status: 'pending' }});

    this.todosApiService.deleteTodo(todoId).subscribe({
      next: () => {
        this.patchState({ deleteTodoLoader: { status: 'success' }});
      },
      error: () => {
        this.patchState({ deleteTodoLoader: { status: 'rejected' }});
      }
    })
  }
}
