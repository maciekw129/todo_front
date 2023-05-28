import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../core/env.token';
import { AuthorizationAPI, LoginPayload, RegisterPayload } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private API_URL = inject(API_URL);
  private http = inject(HttpClient);

  private readonly API_URL_AUTH = this.API_URL + 'auth/';

  login(loginPayload: LoginPayload) {
    return this.http.post<AuthorizationAPI>(this.API_URL_AUTH + 'login', loginPayload);
  }

  register(registerPayload: RegisterPayload) {
    return this.http.post<AuthorizationAPI>(this.API_URL_AUTH + 'register', registerPayload);
  }
}
