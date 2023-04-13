import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs'
import { TodoAPI, TodoPayload, TodosState } from './todos.interface';
import { TodosAPIService } from './todos-api.service';

@Injectable({
  providedIn: 'root'
})

export class TodosStatefulService {
  private todosApiService = inject(TodosAPIService);

  private _todosState$$ = new BehaviorSubject<TodosState>({
    todos: new Map<string, TodoAPI>(),
    getAllTodosLoader: { status: 'initial'},
    addTodoLoader: { status: 'initial' }
  })

  get todosState$$() {
    return this._todosState$$.asObservable();
  }

  get selectTodos$$() {
    return this._todosState$$.pipe(map(state => state.todos));
  }

  get selectGetAllTodosLoader$$() {
    return this._todosState$$.pipe(map(state => state.getAllTodosLoader));
  }

  get selectAddTodoLoader$$() {
    return this._todosState$$.pipe(map(state => state.addTodoLoader));
  }

  private getTodosMap() {
    return this._todosState$$.value.todos;
  }

  private patchState(stateSlice: Partial<TodosState>) {
    this._todosState$$.next({
      ...this._todosState$$.value,
      ...stateSlice
    })
  }

  fetchAllTodos() {
    this.patchState({ getAllTodosLoader: { status: 'pending' }});

    this.todosApiService.getTodos()
    .subscribe({
      next: (result) => {
        result.forEach(todo => {
          this.getTodosMap().set(todo.id, todo);
        })

        this.patchState({
          getAllTodosLoader: { status: 'success' }
        });
      },
      error: () => {
        this.patchState({ getAllTodosLoader: { status: 'rejected' }});
      }
    })
  }

  addTodo(todo: TodoPayload) {
    this.patchState({ addTodoLoader: { status: 'pending' }});

    this.todosApiService.postTodo(todo).subscribe({
      next: (result) => {
        this.patchState({
          todos: this.getTodosMap().set(result.id, result),
          addTodoLoader: { status: 'success'}
        })
      },
      error: () => {
        this.patchState({ addTodoLoader: { status: 'rejected' }});
      }
    })
  }

  completeTodoInState(todoId: string) {
    const todo = this.getTodosMap().get(todoId);

    if(todo) {
      this.getTodosMap().set(todoId, { ...todo, completed: true });
    }
  }

  deleteTodoFromState(todoId: string) {
    this.getTodosMap().delete(todoId);
  }
}
