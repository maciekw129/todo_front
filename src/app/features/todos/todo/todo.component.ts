import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoAPI } from '../todos.interface';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-todo[todo]',
  standalone: true,
  imports: [DatePipe, CardModule],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  @Input() todo!: TodoAPI;
}
