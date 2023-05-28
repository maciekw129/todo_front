import { Component, inject } from '@angular/core';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { RegisterPayload } from '../../auth.interface';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthStatefulService } from '../../auth-stateful.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent, LoaderComponent, NgIf, RouterLink, AsyncPipe],
  templateUrl: './register.component.html'
})
export default class RegisterComponent {
  private authStatefulService = inject(AuthStatefulService);
  private router = inject(Router);

  authLoader$$ = this.authStatefulService.selectAuthLoader$$;

  register(registerPayload: RegisterPayload) {
    this.authStatefulService.handleRegister(registerPayload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    })
  }
}
