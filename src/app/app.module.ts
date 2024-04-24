import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { environment } from 'src/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ResizeModule } from './directives/resize/resize.module';
import { TooltipErrorModule } from './directives/tooltip-error/resize.module';
import { NgxLoadingModule } from 'ngx-loading'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule } from '@angular/forms';
import { ApiErrorDialogComponent } from './components/api-error-dialog/api-error-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SignupComponent } from './components/signup/signup.component';

export const baseUrl = new InjectionToken<string>('baseUrl');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApiErrorDialogComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    AppRoutingModule,
    HttpClientModule,
    ResizeModule,
    TooltipModule,
    ButtonModule,
    TooltipErrorModule,
    ToastModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    { provide: baseUrl, useValue: environment.baseUrl },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
