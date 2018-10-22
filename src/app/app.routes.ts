import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth_guard.service';
import { LoginComponent } from './sdp/login/login.component';
import { DashboardComponent } from './sdp/dashboard/dashboard.component';
import { EmpresasComponent } from './sdp/empresas/empresas.component';
<<<<<<< HEAD
import { UsuariosComponent } from './sdp/usuarios/usuarios.component';
=======
import { PerfilesComponent } from './sdp/perfiles/perfiles.component';
import { OpcionesComponent } from './sdp/opciones/opciones.component';
import { PermisosComponent } from './sdp/permisos/permisos.component';
>>>>>>> d37a61a53139695f01c73aed4eeb48abe3a57652

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
            { path: 'empresas', component: EmpresasComponent },
<<<<<<< HEAD
            { path: 'usuarios', component: UsuariosComponent},

           
=======
            { path: 'perfiles', component: PerfilesComponent },
            { path: 'opciones', component: OpcionesComponent },
            { path: 'permisos', component: PermisosComponent },
>>>>>>> d37a61a53139695f01c73aed4eeb48abe3a57652



        ]
    },
     { path: 'login', component: LoginComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'cambioClave', component: CambioClaveComponent },
    // { path: 'recuperarCuenta', component: RecuperarCuentaComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
