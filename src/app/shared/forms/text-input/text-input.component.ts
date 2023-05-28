import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorsTemplateComponent } from '../errors-template/errors-template.component';
import { CustomControl } from '../custom-control';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ErrorsTemplateComponent],
  templateUrl: './text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent,
    },
  ],
})
export class TextInputComponent extends CustomControl<string> {
  @Input() label: string = '';
}
