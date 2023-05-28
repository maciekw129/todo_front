import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [RouterOutlet],
    template: `
    <h1 class="absolute top-10 w-full text-center font-title text-5xl">Todos!</h1>
    <router-outlet></router-outlet>
    `
})
export class AuthComponent {}