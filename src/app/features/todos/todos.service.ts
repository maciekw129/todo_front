import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../../core/env.token';
import { BehaviorSubject } from 'rxjs'
import { TodoAPI, TodoPayload } from './todos.interface';

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  private API_URL_TODO = this.API_URL + 'todo';

  private _todos$$ = new BehaviorSubject<TodoAPI[]>([]);

  get todos$$() {
    return this._todos$$.asObservable();
  }

  getAllTodos() {
    this.http.get<TodoAPI[]>(this.API_URL_TODO).subscribe(response => {
      this._todos$$.next(response)
    })
  }

  postTodo(todo: TodoPayload) {
    return this.http.post(this.API_URL_TODO, todo);
  }

  deleteTodo(todoId: string) {
    return this.http.delete(this.API_URL_TODO + '/' + todoId);
  }
}
