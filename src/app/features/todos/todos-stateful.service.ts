import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs'
import { TodoAPI, TodoPayload, TodosState } from './todos.interface';
import { TodosAPIService } from './todos-api.service';
import { StatefulService } from 'src/app/shared/services/stateful-service';

@Injectable()
export class TodosStatefulService extends StatefulService<TodosState> {
  private todosApiService = inject(TodosAPIService);

  constructor() {
    super({
      todos: new Map<string, TodoAPI>(),
      getAllTodosLoader: { status: 'initial'},
      addTodoLoader: { status: 'initial' }
    })
  }

  get selectTodos$$() {
    return this._state$$.pipe(map(state => state.todos));
  }

  get selectGetAllTodosLoader$$() {
    return this._state$$.pipe(map(state => state.getAllTodosLoader));
  }

  get selectAddTodoLoader$$() {
    return this._state$$.pipe(map(state => state.addTodoLoader));
  }

  private getTodosMap() {
    return this._state$$.value.todos;
  }

  fetchAllTodos() {
    this.patchState({ getAllTodosLoader: { status: 'pending' }});

    this.todosApiService.getTodos()
    .subscribe({
      next: ({ content }) => {
        content.forEach(todo => {
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
