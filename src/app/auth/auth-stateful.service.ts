import { Injectable, inject } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { AuthState, AuthorizationAPI, LoginPayload, RegisterPayload } from './auth.interface';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStatefulService {
  private authApiService = inject(AuthApiService);
  private tokenService = inject(TokenService);

  private _authState$$ = new BehaviorSubject<AuthState>({
    userDetails: null,
    authLoader: { status: "initial" }
  });

  get selectUserDetails$$() {
    return this._authState$$.pipe(map(state => state.userDetails));
  }

  get selectAuthLoader$$() {
    return this._authState$$.pipe(map(state => state.authLoader));
  }

  get isAuthorized$$() {
    return this.tokenService.token$$;
  }

  private patchState(stateSlice: Partial<AuthState>) {
    this._authState$$.next({
      ...this._authState$$.value,
      ...stateSlice
    })
  }

  private handleAuthSuccess(response: AuthorizationAPI) {
    this.tokenService.saveToken(response.token);
    this.patchState({ authLoader: { status: "success" }});
  }

  handleLogin(loginPayload: LoginPayload) {
    this.patchState({ authLoader: { status: "pending" }});

    return this.authApiService.login(loginPayload).pipe(
      tap({
      next: response => this.handleAuthSuccess(response),
      error: () => {
        this.patchState({ authLoader: { status: "rejected", rejectedMessage: "Login failed." }});
      }
    }))
  }

  handleRegister(registerPayload: RegisterPayload) {
    this.patchState({ authLoader: { status: "pending" }});

    this.authApiService.register(registerPayload).pipe(
      tap({
        next: response => this.handleAuthSuccess(response),
        error: () => {
          this.patchState({ authLoader: { status: "rejected", rejectedMessage: "Something went wrong" }});
        }
      })
    )
  }

  handleLogout() {
    return of(this.tokenService.removeToken()).pipe(
      tap(() => {
        this.patchState({
          userDetails: null,
          authLoader: { status: "initial" }
        })
      })
    )
  }

  resetLoader() {
    this.patchState({
      authLoader: { status: "initial" }
    })
  }

  fetchUser(token: string) {
    this.tokenService.saveToken(token);
  }
}
