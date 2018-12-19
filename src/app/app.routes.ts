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
import { VentaPrincipalComponent } from './sdp/venta-principal/venta-principal.component';
import { CotizacionComponent } from './sdp/cotizacion/cotizacion.component';
import { ClienteDomicilioComponent } from './sdp/cliente-domicilio/cliente-domicilio.component';
import { BeneficiariosDependientesComponent } from './sdp/beneficiarios-dependientes/beneficiarios-dependientes.component';
import { EmisionComponent } from './sdp/emision/emision.component';
import { FinancieroComponent } from './sdp/financiero/financiero.component';
import { RecuperarCuentaComponent } from './sdp/recuperar-cuenta/recuperar-cuenta.component';
import { DatosFacturacionComponent } from './sdp/datos-facturacion/datos-facturacion.component';

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

            { path: 'venta', component: VentaPrincipalComponent },
            { path: 'financiero', component: FinancieroComponent },
            { path: 'cotizacion', component: CotizacionComponent },
            { path: 'cli-dom', component: ClienteDomicilioComponent },
            { path: 'beneDepe', component: BeneficiariosDependientesComponent },
            { path: 'cotizacion', component: EmisionComponent },
            { path: 'facturacion', component: DatosFacturacionComponent },
            { path: 'emision', component: EmisionComponent }
        ]
    },
     { path: 'login', component: LoginComponent },
    // { path: 'logout', component: LogoutComponent },
    // { path: 'cambioClave', component: CambioClaveComponent },
     { path: 'recuperarCuenta', component: RecuperarCuentaComponent },

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
