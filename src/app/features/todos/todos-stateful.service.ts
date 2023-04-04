import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { TodoAPI } from './todos.interface';
import { TodosAPIService } from './todos-api.service';

@Injectable({
  providedIn: 'root'
})

export class TodosStatefulService {
  private todosApiService = inject(TodosAPIService);

  private _todos$$ = new BehaviorSubject<TodoAPI[]>([]);

  get todos$$() {
    return this._todos$$.asObservable();
  }

  fetchAllTodos() {
    this.todosApiService.getTodos().subscribe(response => {
      this._todos$$.next(response);
    })
  }
}
