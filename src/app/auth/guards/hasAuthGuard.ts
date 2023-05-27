import { inject } from "@angular/core"
import { AuthStatefulService } from "../auth-stateful.service";
import { map } from "rxjs";

export const hasAuthGuard = () => {
    const authStatefulService = inject(AuthStatefulService);

    return authStatefulService.isAuthorized$$.pipe(
        map(value => !value)
    )
}