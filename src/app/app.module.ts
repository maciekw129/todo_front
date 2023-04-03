import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { API_URL } from './core/env.token';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./core/shell.module')
      }
    ]),
    HttpClientModule
  ],
  providers: [{
    provide: API_URL,
    useValue: environment.apiUrl
  }],
  bootstrap: [AppComponent]
})

export class AppModule {}
