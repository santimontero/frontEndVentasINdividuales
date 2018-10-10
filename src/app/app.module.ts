import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                 //api
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './sdp/login/login.component';
import { AppConfig } from './app-config';
import { AppMessages } from './app-messages';
import { AuthGuard } from './services/auth_guard.service';
import { ApiRequestService } from './services/api-request.service';
import { UserInfoService } from './services/user-info.service';
import { LoginService } from './services/api/seguridad/login.service';
import { AppLoginComponent } from './app.login.component';
import { DashboardComponent } from './sdp/dashboard/dashboard.component';
import { HttpClientModule, HttpRequest, HttpEvent, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { GrowlModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    GrowlModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    UserInfoService, AuthGuard, ApiRequestService, AppConfig, AppMessages

  ],
  bootstrap: [AppLoginComponent]
})
export class AppModule { }
