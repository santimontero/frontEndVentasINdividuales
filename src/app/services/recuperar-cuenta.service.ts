import { Injectable } from "@angular/core";
import { AppConfig } from "../app-config";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";


@Injectable()
export class RecuperarCuentaService{
    private url: string;

    constructor(
        public appConfig: AppConfig,
        private httpClient: HttpClient){           
    }

    sendMail4NewPassw(mail: string): Observable<any>{
        this.url = this.appConfig.baseApiPath + '/api/usuarios/nuevacontrasenia?email=' + mail
        return this.httpClient.get<any>(this.url)
        .pipe(catchError(this.handleError))
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = 'An error occurred: ' + err.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = 'Server returned code: ' + err.status + ', error message is: ' + err.message;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}