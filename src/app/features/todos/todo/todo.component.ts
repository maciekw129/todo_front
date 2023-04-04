import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoAPI } from '../todos.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-todo[todo]',
  standalone: true,
  imports: [DatePipe, CardModule, ButtonModule, RippleModule],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})
export class TodoComponent {

  @Input() todo!: TodoAPI;
  @Output() deleteTodoEvent = new EventEmitter<string>;

  sendDeleteEvent(todoId: string) {
    this.deleteTodoEvent.emit(todoId);
  }
}
