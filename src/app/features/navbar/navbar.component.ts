import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { AuthStatefulService } from 'src/app/auth/auth-stateful.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, InputTextModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  private authStatefulService = inject(AuthStatefulService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  items: MenuItem[] = [
    {
        label:'Logout',
        icon:'pi pi-fw pi-power-off',
        command: () => this.logout()
    }
  ];

  logout() {
    this.authStatefulService.handleLogout().subscribe(() => {
      this.router.navigate(["/auth"], { relativeTo: this.route })
    })
  }
}
