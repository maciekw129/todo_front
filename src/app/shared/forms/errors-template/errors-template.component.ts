import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-errors-template',
  standalone: true,
  imports: [NgIf],
  templateUrl: './errors-template.component.html',
})
export class ErrorsTemplateComponent implements OnInit {
  @Input() control!: FormControl<any>;

  ngOnInit() {
    this.validateRequiredInputs();
  }

  private validateRequiredInputs() {
    if (!this.control)
      throw new Error(
        "Input 'control' is required in errors-template component."
      );
  }
}
