import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

import { ApiRequestService } from '../../api-request.service';
import { UserInfoService, LoginInfoInStorage, TokenStorage } from '../../user-info.service';
import { MessageService } from 'primeng/components/common/messageservice';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { error } from 'util';

export interface LoginRequestParam {
    username: string;
    password: string;
}

@Injectable()
export class LoginService {

    public landingPage: string = "/home/dashboard/";
    msgs: Message[] = [];


    token: string;
    constructor(
        private router: Router,
        private http: Http,
        private userInfoService: UserInfoService,
        private apiRequest: ApiRequestService
    ) {
    }



    getToken(username: string, password: string): Observable<any> {

        let resultado: Subject<any> = new Subject<any>();
        this.userInfoService.removeUserInfo();

        let loginInfoReturn: LoginInfoInStorage;
        let tokenInfoReturn: TokenStorage;
        let loginDataSubject: Subject<any> = new Subject<any>();

        let parametros = new URLSearchParams;
        parametros.append('grant_type', 'password');
        // parametros.append('client_id', 'eagleeye');
        // parametros.append('client_secret', 'thisissecret');
        parametros.append('username', username);
        parametros.append('password', password);
        // parametros.append('scope', 'webclient');

        this.apiRequest.postLogin('/Token', parametros)
            .subscribe(respuesta => {
      
                if (respuesta !== undefined && respuesta !== null && respuesta.access_token !== undefined && respuesta.access_token !== null) {
                    tokenInfoReturn = { "token": respuesta.token_type + " " + respuesta.access_token };
                    this.userInfoService.storeTokenInfo(JSON.stringify(tokenInfoReturn));
                    resultado.next(respuesta);
                }
            }, error => {
                resultado.next(error);
            });
         
        return resultado;
    }

    showError(msj) {
        this.msgs.push({ severity: 'error', summary: 'Error', detail: msj });
    }

    getTokenVer(username: string, password: string): Observable<any> {

        let resultado: Subject<any> = new Subject<any>();

        let parametros = new URLSearchParams;
        parametros.append('grant_type', 'password');
        parametros.append('client_id', 'eagleeye');
        parametros.append('client_secret', 'thisissecret');
        parametros.append('username', username.toLowerCase());
        parametros.append('password', password);
        parametros.append('scope', 'webclient');

        this.apiRequest.postVerifyCredential('auth/oauth/token', parametros)
            .subscribe(respuesta => {
                if (respuesta !== undefined && respuesta !== null && respuesta.access_token !== undefined && respuesta.access_token !== null) {
                    resultado.next(true);
                }
            }, error => {
                resultado.next(false);
            });

        return resultado;
    }



    logout(navigatetoLogout = true): void {
        // clear token remove user from local storage to log user out
        this.userInfoService.removeUserInfo();
        if (navigatetoLogout) {
            this.router.navigate(["login"]);
        }
    }
}