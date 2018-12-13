import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab         
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

import { GrowlModule, DropdownModule, TreeModule, InputTextModule, MenubarModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { PermisosComponent } from './sdp/permisos/permisos.component';


import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';

import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';

import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScheduleModule } from 'primeng/schedule';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';

import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { TooltipModule } from 'primeng/tooltip';

import { TreeTableModule } from 'primeng/treetable';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { BreadcrumbService } from './breadcrumb.service';

import { MenuItem} from 'primeng/api';
import { EmpresasComponent } from './sdp/empresas/empresas.component';

import { UsuariosComponent } from './sdp/usuarios/usuarios.component';
import { PerfilesComponent } from './sdp/perfiles/perfiles.component';
import { OpcionesComponent } from './sdp/opciones/opciones.component';
import { VentaPrincipalComponent } from './sdp/venta-principal/venta-principal.component';
import { CotizacionComponent } from './sdp/cotizacion/cotizacion.component';
import { ClienteDomicilioComponent } from './sdp/cliente-domicilio/cliente-domicilio.component';
import { BeneficiariosDependientesComponent } from './sdp/beneficiarios-dependientes/beneficiarios-dependientes.component';
import { EmisionComponent } from './sdp/emision/emision.component';
import { FinancieroComponent } from './sdp/financiero/financiero.component';
import { ClienteComponent } from './sdp/cliente/cliente.component';
import { RecuperarCuentaComponent } from './sdp/recuperar-cuenta/recuperar-cuenta.component';
import { FormaPagoComponent } from './sdp/forma-pago/forma-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLoginComponent,
    DashboardComponent,
    EmpresasComponent,
    UsuariosComponent,
    PerfilesComponent,
    OpcionesComponent,
    PermisosComponent,
    AppRightPanelComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    AppBreadcrumbComponent,
    AppTopBarComponent,
    AppFooterComponent,
    VentaPrincipalComponent,
    CotizacionComponent,
    ClienteDomicilioComponent,
    BeneficiariosDependientesComponent,
    EmisionComponent,
    FinancieroComponent,
    ClienteComponent,
    RecuperarCuentaComponent,
    FormaPagoComponent,
  ],
  imports: [
    MenubarModule,
    InputTextModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    GrowlModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    TreeModule,
    BrowserModule,
    FormsModule,
    AppRoutes,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GrowlModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScheduleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule
  ],
  providers: [
    LoginService,
    UserInfoService, AuthGuard, ApiRequestService, AppConfig, AppMessages

  ],
  bootstrap: [AppLoginComponent]
})
export class AppModule { }
