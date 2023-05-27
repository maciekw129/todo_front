import { Directive } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Directive()
export abstract class StatefulService<T> {

    protected _state$$: BehaviorSubject<T>;

    constructor(initialState: T) {
        this._state$$ = new BehaviorSubject<T>(initialState);
    }

    protected patchState(stateSlice: Partial<T>) {
        this._state$$.next({
            ...this._state$$.value,
            ...stateSlice
        })
    }
}