import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth_guard.service';
import { LoginComponent } from './sdp/login/login.component';
import { DashboardComponent } from './sdp/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home/dashboard', canActivate: [AuthGuard], pathMatch: 'full'
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: AppComponent,
        children: [

            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },

           



        ]
    },
     { path: 'login', component: LoginComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'cambioClave', component: CambioClaveComponent },
    // { path: 'recuperarCuenta', component: RecuperarCuentaComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
