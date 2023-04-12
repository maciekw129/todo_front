import { Injectable, inject } from '@angular/core';
import { TodosAPIService } from '../todos-api.service';
import { BehaviorSubject, map } from 'rxjs';
import { TodoState } from '../todos.interface';
import { TodosStatefulService } from '../todos-stateful.service';

@Injectable()

export class TodoStatefulService {
  private todosApiService = inject(TodosAPIService);
  private todosStatefulService = inject(TodosStatefulService);

  private _todoState$$ = new BehaviorSubject<TodoState>({
    deleteTodoLoader: { status: 'initial' },
    completeTodoLoader: { status: 'initial' }
  })

  get todoState$$() {
    return this._todoState$$.asObservable();
  }

  private patchState(stateSlice: Partial<TodoState>) {
    this._todoState$$.next({
      ...this._todoState$$.value,
      ...stateSlice
    })
  }

  selectDeleteTodoLoader() {
    return this.todoState$$.pipe(map(state => state.deleteTodoLoader));
  }

  deleteTodo(todoId: string) {
    this.patchState({ deleteTodoLoader: { status: 'pending' }});

    this.todosApiService.deleteTodo(todoId).subscribe({
      next: () => {
        this.patchState({ deleteTodoLoader: { status: 'success' }});
        this.todosStatefulService.deleteTodoFromState(todoId);
      },
      error: () => {
        this.patchState({ deleteTodoLoader: { status: 'rejected' }});
      }
    })
  }
}
