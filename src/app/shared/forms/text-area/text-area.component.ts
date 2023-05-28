import { Component, Input } from '@angular/core';
import { CustomControl } from '../custom-control';
import { ErrorsTemplateComponent } from '../errors-template/errors-template.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [ErrorsTemplateComponent, ReactiveFormsModule, InputTextareaModule],
  templateUrl: './text-area.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextAreaComponent,
    },
  ],
})
export class TextAreaComponent extends CustomControl<string> {
  @Input() label: string = '';
  @Input() rows: number = 5;
  @Input() cols: number = 30;
}
