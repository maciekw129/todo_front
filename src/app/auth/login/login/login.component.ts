import { Component, OnDestroy, inject } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthStatefulService } from '../../auth-stateful.service';
import { LoginPayload } from '../../auth.interface';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, LoaderComponent, AsyncPipe, NgIf, RouterLink, CardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnDestroy {
  private authStatefulService = inject(AuthStatefulService);
  private router = inject(Router);

  authLoader$$ = this.authStatefulService.selectAuthLoader$$;

  login(loginPayload: LoginPayload) {
    this.authStatefulService.handleLogin(loginPayload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy() {
      this.authStatefulService.resetLoader();
  }
}
