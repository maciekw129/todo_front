import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthStatefulService } from "../auth-stateful.service";
import { tap } from "rxjs";

export const authGuard = () => {
    const router = inject(Router);
    const authStatefulService = inject(AuthStatefulService);

    return authStatefulService.isAuthorized$$.pipe(
        tap(value => {
            value ? true : router.navigate(['/auth'])
        })
    )
}