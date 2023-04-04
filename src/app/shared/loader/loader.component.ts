import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderState } from './loader.interface';

@Component({
  selector: 'app-loader[loaderState]',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, NgIf],
  templateUrl: './loader.component.html'
})
export class LoaderComponent {
  @Input() loaderState: LoaderState = { status:'initial' };
}
