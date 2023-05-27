import { Component } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { RegisterPayload } from '../../auth.interface';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent, LoaderComponent, NgIf],
  templateUrl: './register.component.html'
})
export default class RegisterComponent {

  register(registerPayload: RegisterPayload) {
    console.log(registerPayload);
    
  }
}