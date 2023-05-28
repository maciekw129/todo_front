import { Injectable, inject } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { map, of, tap } from 'rxjs';
import { AuthState, AuthorizationAPI, LoginPayload, RegisterPayload } from './auth.interface';
import { TokenService } from './token.service';
import { StatefulService } from '../shared/services/stateful-service';

@Injectable({
  providedIn: 'root'
})
export class AuthStatefulService extends StatefulService<AuthState> {
  private authApiService = inject(AuthApiService);
  private tokenService = inject(TokenService);

  constructor() {
    super({
      userDetails: null,
      authLoader: { status: "initial" }
    })
  }

  get selectUserDetails$$() {
    return this._state$$.pipe(map(state => state.userDetails));
  }

  get selectAuthLoader$$() {
    return this._state$$.pipe(map(state => state.authLoader));
  }

  get isAuthorized$$() {
    return this.tokenService.token$$;
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
        this.patchState({ authLoader: { status: "rejected", rejectedMessage: "Provided credentials don't match with any account." }});
      }
    }))
  }

  handleRegister(registerPayload: RegisterPayload) {
    this.patchState({ authLoader: { status: "pending" }});

    return this.authApiService.register(registerPayload).pipe(
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
