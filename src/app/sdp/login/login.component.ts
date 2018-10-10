import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../app/services/api/seguridad/login.service';
import { Message } from 'primeng/primeng';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/components/common/selectitem';
import { error } from 'selenium-webdriver';
import { UserInfoService, LoginInfoInStorage, TokenStorage } from '../../services/user-info.service';
import { ApiRequestService } from '../../services/api-request.service';
import { CaptchaModule } from 'primeng/captcha';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';

import { PasswordModule } from 'primeng/password';


import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppConfig } from '../../app-config';

import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
    model: any = {};
    loginDataSubject: any = {};
    public msgs: Message[] = [];
    mensajeInicio: any;
    lenguajesDisponibles: SelectItem[];;
    lenguajeSeleccionado: string;
    habilitarlogin: boolean = true;
    habilitarReload: boolean = true;
    loader: boolean = false;
    public landingPage: string = "/home/dashboard/";

    constructor(
        private router: Router,
        private loginService: LoginService,
        private ars: ActivatedRoute,
        private userInfoService: UserInfoService,
        private apiRequest: ApiRequestService,
        private http: Http,
        private AppConfig: AppConfig,
        private messageService: MessageService

    ) {
        this.ars.params.subscribe(parametros => {
            if (parametros && parametros['mensaje'] != undefined) {
                this.mensajeInicio = parametros['mensaje'];
            }
        });
    }

    ngOnInit() {
        this.msgs = [];
        if (this.mensajeInicio && this.mensajeInicio !== '') {
            this.mensaje("info", this.mensajeInicio);
        }
        this.lenguajeSeleccionado = 'es';
    }

    showError(msj) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msj });
    }

    login() {
        this.clearViaService();
        if (this.model != null && this.model.username != undefined && this.model.password) {
            let loginInfoReturn: LoginInfoInStorage;
            this.loader = true; //activar cargando                    

            this.loginService.getToken(this.model.username, this.model.password)
                .subscribe(resp => {
                   
                    if (resp._body != undefined && resp._body.type == 'error') {
                        this.loader = false; //desactivar cargando                    
                        this.showError('El servicio no se encuentra disponible, por favor intentelo en unos minutos');
                    } else {
                        if (resp.access_token !== undefined) {
                            let params: URLSearchParams = new URLSearchParams();
                            params.set('codUser', 'DOHERNAN');
                            this.apiRequest.get('/api/usuario/buscar', 'Login', params).subscribe(
                                respuestaSesion => {
                                    if (respuestaSesion !== undefined && respuestaSesion !== null) {
                                        loginInfoReturn = {
                                            "success": true,
                                            "message": respuestaSesion.operationMessage,
                                            "landingPage": respuestaSesion.esCambio ? "cambioClave" : this.landingPage,
                                            "user": {
                                                "userId": respuestaSesion.id,
                                                "email": respuestaSesion.email,
                                                "displayName": respuestaSesion.nombre + " " + respuestaSesion.apellido,
                                                "token": 'bearer ' + this.userInfoService.getStoredToken(),
                                                "esCambio": respuestaSesion.esCambio,
                                                "empresaId": respuestaSesion.idEmpresa,
                                                "agenciaId": 'null', // es para detectar primer inicio de sesion
                                                "agenciaName": respuestaSesion.AgenciaId,
                                                "path": respuestaSesion.path,
                                            }
                                        };
                                        // Almacenamos la informacion del usuario dentro de la variable de sesion
                                        this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));

                                        this.router.navigate([respuestaSesion.esCambio ? "cambioClave" : this.landingPage]);

                                        this.loader = false; //activar cargando
                                    } else {
                                        this.loader = false;
                                        this.userInfoService.removeUserInfo();
                                        this.showError('El servicio no se encuentra disponible, por favor intentelo en unos minutos');
                                    }

                                }, error => {
                                    this.loader = false;
                                    this.userInfoService.removeUserInfo();
                                    this.showError('El servicio no se encuentra disponible, por favor intentelo en unos minutos');
                                }
                            );
                        } else {
                            let msj: any = JSON.parse(resp['_body']);
                            if (msj.error_description != null && msj.error_description == 'User credentials have expired') {
                                this.showError('Las credenciales de usuario han expirado');
                            } else if (msj.error_description != null && msj.error_description == 'User account is locked') {
                                this.showError('La cuenta de usuario está bloqueada');
                            } else if (msj.error_description != null && msj.error_description == 'User account has expired') {
                                this.showError('La cuenta de usuario ha expirado');
                            } else if (msj.error_description != null && msj.error_description == 'User is disabled') {
                                this.showError('La cuenta de usuario esta deshabilitado');
                            } else {
                                this.showError('Correo electrónico o clave incorrectos');
                            }
                            this.loader = false;
                            this.userInfoService.removeUserInfo();
                        }
                    }

                },
                errResponse => {
                    this.loader = false;
                    switch (errResponse.status) {
                        case 401:
                            this.showError('Correo Electrónico o clave incorrecto');
                            break;
                        case 404:
                            this.showError('Servicio no encontrado');
                            break;
                        case 408:
                            this.showError('Request Timedout');
                            break;
                        case 500:
                            this.showError('El servicio no se encuentra disponible intentelo en unos minutos');
                            break;
                        default:
                            this.showError('Correo Electrónico o clave incorrecta');
                    }
                }
                );
        } else {
            this.loader = false; //activar cargando
            this.showError('Los campos correo electrónico y clave son obligatorios');
        }

    }


    public mensaje(tipo: string, mensaje: string) {
        this.msgs = [];
        this.messageService.add({ severity: tipo.toLowerCase(), summary: '', detail: mensaje });
    }

    registro() {
        this.router.navigate(["/registro"]);

    }

    clearViaService() {
        this.messageService.clear();
    }


    showResponse(response) {
        this.habilitarlogin = false;

        /* let parametros = new URLSearchParams;
         parametros.append('secret', '6LdlxUgUAAAAAEeHVn0bGyH-lgF2TXxQZAu6jiyb');
         parametros.append('response', response.response);
 
         this.apiRequest.postCaptcha('https://www.google.com/recaptcha/api/siteverify', parametros)
             .subscribe(respuesta => {
       
             }, error => {
                
             });
        */
    }

    openRecover() {
        this.router.navigate(["/recuperarCuenta"]);
    }

} 