import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { API_URL } from './core/env.token';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authGuard } from './auth/guards/authGuard';
import { initializeAuth } from './auth/initializeAuth';
import { hasAuthGuard } from './auth/guards/hasAuthGuard';
import { TokenInterceptor } from './auth/interceptors/tokenInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('./core/shell.module')
      },
      {
        path: 'auth',
        canActivate: [hasAuthGuard],
        loadComponent: () => import('./auth/login/login/login.component')
      },
      {
        path: 'register',
        canActivate: [hasAuthGuard],
        loadComponent: () => import('./auth/register/register/register.component')
      }
    ]),
    HttpClientModule
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
