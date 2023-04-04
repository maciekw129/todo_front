import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs'
import { TodoAPI, TodoPayload, TodosState } from './todos.interface';
import { TodosAPIService } from './todos-api.service';

@Injectable({
  providedIn: 'root'
})

export class TodosStatefulService {
  private todosApiService = inject(TodosAPIService);

  private _todosState$$ = new BehaviorSubject<TodosState>({
    todos: [],
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

  private patchState(stateSlice: Partial<TodosState>) {
    this._todosState$$.next({
      ...this._todosState$$.value,
      ...stateSlice
    })
  }

  fetchAllTodos() {
    this.patchState({ getAllTodosLoader: { status: 'pending' }});

    this.todosApiService.getTodos().subscribe({
      next: (result) => {
        this.patchState({
          todos: result,
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
          todos: [...this._todosState$$.value.todos, result],
          addTodoLoader: { status: 'success'}
        })
      },
      error: () => {
        this.patchState({ addTodoLoader: {status: 'rejected' }});
      }
    })
  }

  deleteTodoFromState(todoId: string) {
    const filteredTodos = this._todosState$$.value.todos.filter(({ id }) => id !== todoId);
    this.patchState({ todos: filteredTodos });
  }
}
