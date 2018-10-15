import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { UserInfoService, LoginInfoInStorage, UserInStorage } from './user-info.service';
import { AppConfig } from '../app-config';
import { HttpClientModule, HttpRequest, HttpEvent, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppMessages } from './../app-messages';
import { SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';
import { error } from 'selenium-webdriver';



@Injectable()
export class ApiRequestService {

    private headers: Headers;
    private requestOptions: RequestOptions;
    public TimeFormat: string;
    constructor(
        public appConfig: AppConfig,
        private http: Http,
        private router: Router,
        private userInfoService: UserInfoService,
        private httpClient: HttpClient,
        private domSanitizer: DomSanitizer,
        public mensaje: AppMessages

    ) {
     
        this.TimeFormat = 'DD/MM/YYYY h:mm:ss a';
    }

    /**
     * This is a Global place to add all the request headers for every REST calls
     */
    appendAuthHeader(): Headers {
        

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let token = this.userInfoService.getStoredToken();
        if (token !== null && token !== undefined) {
            headers.append("Authorization", token);
        } else {
            headers.append('Authorization', 'Basic ' + btoa("eagleeye:thisissecret"));
        }
        return headers;
    }

    appendAuthHeaderValidateCredential(): Headers {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic ' + btoa("eagleeye:thisissecret"));
        return headers;
    }

  
    /**
     * This is a Global place to define all the Request Headers that must be sent for every ajax call
     */
    getRequestOptions(requestMethod, url: string, urlParam?: URLSearchParams, body?: Object): RequestOptions {
        let options = new RequestOptions({
            headers: this.appendAuthHeader(),
            method: requestMethod,
            url: this.appConfig.baseApiPath + url   //this.api + url,
        });
        if (urlParam) {
            options = options.merge({ params: urlParam });
        }
        if (body) {
            options = options.merge({ body: JSON.stringify(body) });
        }
        return options;
    }


    getRequestOptionsLogin(requestMethod, url: string, urlParam?: URLSearchParams, body?: Object): RequestOptions {
        let options = new RequestOptions({
            headers: this.appendAuthHeader(),
            method: requestMethod,
            url: this.appConfig.baseApiPathAuth + url   //this.api + url,
        });
        console.log(options)
        if (urlParam) {
            options = options.merge({ params: urlParam });
        }
        if (body) {
            options = options.merge({ body: JSON.stringify(body) });
        }
        return options;
    }


    getRequestOptionsValidateCredential(requestMethod, url: string, urlParam?: URLSearchParams, body?: Object): RequestOptions {
        let options = new RequestOptions({
            headers: this.appendAuthHeaderValidateCredential(),
            method: requestMethod,
            url: this.appConfig.baseApiPathAuth + url   //this.api + url,
        });
        if (urlParam) {
            options = options.merge({ params: urlParam });
        }
        if (body) {
            options = options.merge({ body: JSON.stringify(body) });
        }
        return options;
    }


 
    get(url: string, tituloPagina: string, urlParams?: URLSearchParams): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Get, url, urlParams);
  
        
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                console.log(error)
                let resp: any = JSON.parse(error['_body']);
              
                    if (error.status === 401 || error.status === 403) {
                        me.router.navigate(['/logout']);
                    } else if (resp.operationStatus != null && resp.operationStatus != undefined) {
                        me.mensaje.mensajeServer(resp.operationStatus, resp.operationMessage, tituloPagina);
                        return Observable.throw(error || 'Server error');
                    }
                
            });
    }

    post(url: string, body: Object, tituloPagina: string, params?: URLSearchParams): Observable<any> {
        let me = this;
     
        let requestOptions = this.getRequestOptions(RequestMethod.Post, url, params, body);
        console.log(requestOptions)
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                let resp: any = JSON.parse(error['_body']);
                
                    if (error.status === 401 || error.status === 403) {
                        me.router.navigate(['/logout']);
                    } else if (resp.operationStatus != null && resp.operationStatus != undefined) {
                        me.mensaje.mensajeServer(resp.operationStatus, resp.operationMessage, tituloPagina);
                        return Observable.throw(error || 'Server error');
                    }
                
            });
    }

  
 

   


 

    getInfoUsuario(): UserInStorage {
        return this.userInfoService.getUserInfo();
    }

    postLogin(url: string, urlParam?: URLSearchParams): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptionsLogin(RequestMethod.Post, url, urlParam, undefined);

        return this.http.post(this.appConfig.baseApiPathAuth + url,urlParam)
            .map(resp => resp.json())
            .catch(function (error: any) {
                console.log(error)
                if (error.status === 401) {
                    //  me.router.navigate(['/logout']);
                }

                return Observable.throw(error || 'Server error')
            });
    }


    postLogout(url: string, urlParam?: URLSearchParams): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptionsLogin(RequestMethod.Post, url, urlParam, undefined);
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                if (error.status === 401) {
                    //  me.router.navigate(['/logout']);
                }

                return Observable.throw(error || 'Server error')
            });
    }

    postVerifyCredential(url: string, urlParam?: URLSearchParams): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptionsValidateCredential(RequestMethod.Post, url, urlParam, undefined);
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                if (error.status === 401) {
                    //  me.router.navigate(['/logout']);
                }

                return Observable.throw(error || 'Server error')
            });
    }


  
    put(url: string, body: Object, tituloPaguina: string): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Put, url, undefined, body);
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                let resp: any = JSON.parse(error['_body']);
                
                    if (error.status === 401 || error.status === 403) {
                        me.router.navigate(['/logout']);
                    } else if (resp.operationStatus != null && resp.operationStatus != undefined) {
                        me.mensaje.mensajeServer(resp.operationStatus, resp.operationMessage, tituloPaguina);
                        return Observable.throw(error || 'Server error');
                    }
                
            });
    }

    delete(url: string, tituloPagina: string): Observable<any> {
        let me = this;
        let requestOptions = this.getRequestOptions(RequestMethod.Delete, url);
        return this.http.request(new Request(requestOptions))
            .map(resp => resp.json())
            .catch(function (error: any) {
                let resp: any = JSON.parse(error['_body']);
               
                    if (error.status === 401 || error.status === 403) {
                        me.router.navigate(['/logout']);
                    } else if (resp.operationStatus != null && resp.operationStatus != undefined) {
                        me.mensaje.mensajeServer(resp.operationStatus, resp.operationMessage, tituloPagina);
                        return Observable.throw(error || 'Server error');
                    }
                
            });
    }

   



}
