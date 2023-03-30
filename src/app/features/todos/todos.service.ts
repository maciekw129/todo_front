import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../../core/env.token';
import { BehaviorSubject } from 'rxjs'
import { TodoAPI } from './todos.interface';

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  private _todos$$ = new BehaviorSubject<TodoAPI[]>([]);

  get todos$$() {
    return this._todos$$.asObservable();
  }

  getAllTodos() {
    this.http.get<TodoAPI[]>(this.API_URL + 'todo').subscribe(response => {
      this._todos$$.next(response)
    })
  }
}
