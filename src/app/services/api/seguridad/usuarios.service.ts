import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, URLSearchParams, RequestMethod } from '@angular/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { ApiRequestService } from '../../api-request.service';

@Injectable()
export class UsuariosService {

    constructor(
        private apiRequest: ApiRequestService
    ) { }

    getUsuarios(page?: number, size?: number,  sort?: string, direction? :number): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();

        if(page !== 0){
            page = page /size;
        }

        params.set('page', typeof page === "number" ? page.toString() : "0");
        params.set('size', typeof page === "number" ? size.toString() : "1000");
        params.set('sort',  sort === null ? null : sort);
        params.set('direction', direction === -1 ? "DESC" : "ASC");
        
        let usuariosListSubject = new Subject<any>();

        this.apiRequest.get('api/seguridad/usuarios','Usuarios' ,params)
            .subscribe(jsonResp => {
                let returnObj = Object.assign({}, jsonResp, {
                    content: jsonResp.content
                })
                usuariosListSubject.next(returnObj); 
            });

        return usuariosListSubject;
    }
}
