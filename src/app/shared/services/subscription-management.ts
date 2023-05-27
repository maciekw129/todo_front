import { Directive } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class SubscriptionManagement {
    protected unsubscribe$$ = new Subject();

    ngOnDestroy() {
        this.unsubscribe$$.next(null);
        this.unsubscribe$$.complete();
    }
}