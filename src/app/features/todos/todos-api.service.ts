import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'src/app/core/env.token';
import { TodoAPI, TodoPatchPayload, TodoPayload, TodosAPIResponse } from './todos.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosAPIService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);
  
  private API_URL_TODO = this.API_URL + 'todo';
  
  getTodos() {
    return this.http.get<TodosAPIResponse>(this.API_URL_TODO);
  }

  postTodo(todo: TodoPayload) {
    return this.http.post<TodoAPI>(this.API_URL_TODO, todo);
  }

  deleteTodo(todoId: string) {
    return this.http.delete(this.API_URL_TODO + '/' + todoId);
  }

  patchTodo(todoId: string, partialTodo: Partial<TodoPatchPayload>) {
    return this.http.patch<TodoAPI>(this.API_URL_TODO + '/' + todoId, partialTodo);
  }
}
