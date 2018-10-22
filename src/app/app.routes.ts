import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth_guard.service';
import { LoginComponent } from './sdp/login/login.component';
import { DashboardComponent } from './sdp/dashboard/dashboard.component';
import { EmpresasComponent } from './sdp/empresas/empresas.component';
import { UsuariosComponent } from './sdp/usuarios/usuarios.component';
import { PerfilesComponent } from './sdp/perfiles/perfiles.component';
import { OpcionesComponent } from './sdp/opciones/opciones.component';
import { PermisosComponent } from './sdp/permisos/permisos.component';

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
            { path: 'usuarios', component: UsuariosComponent},

           
            { path: 'perfiles', component: PerfilesComponent },
            { path: 'opciones', component: OpcionesComponent },
            { path: 'permisos', component: PermisosComponent },



        ]
    },
     { path: 'login', component: LoginComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'cambioClave', component: CambioClaveComponent },
    // { path: 'recuperarCuenta', component: RecuperarCuentaComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
