import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token$$ = new BehaviorSubject<string | null>(localStorage.getItem("token"));
  private _decodedToken$$ = new BehaviorSubject<JwtPayload | null>(null);

  private readonly MILISECONDS_IN_SECONDS = 1000;

  get token$$() {
    return this._token$$.asObservable();
  }

  get token() {
    return this._token$$.value;
  }

  get decodedToken() {
    return this._decodedToken$$.value;
  }

  constructor() {
    this.decodeToken();
  }

  private decodeToken() {
    const token = this._token$$.value;
    if (token) this._decodedToken$$.next(jwtDecode<JwtPayload>(token));
  }

  isTokenExpired(): boolean | void {
    const expTime = this._decodedToken$$.value?.exp;
    if (expTime) {
      const expDate = new Date(expTime * this.MILISECONDS_IN_SECONDS);
      return expDate.getTime() - Date.now() < 0;
    }
  }

  saveToken(token: string) {
    this._token$$.next(token);
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
    this._token$$.next(null);
  }
}
