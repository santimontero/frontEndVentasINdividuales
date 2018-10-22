import { Injectable } from '@angular/core';

export interface UserInStorage {
    userId: string;
    email: string;
    displayName: string;
    token: string;
    esCambio: boolean;
    empresaId: string;
    agenciaId: string;
    agenciaName: string;
    path: string;
    perfil:number;
}

export interface LoginInfoInStorage {
    success: boolean;
    message: string;
    landingPage: string;
    user?: UserInStorage;
}

export interface TokenStorage{
    token: string;
}

@Injectable()
export class UserInfoService {

    public currentUserKey: string = "currentUser";
    public currentToken: string = "currentToken";
    public storage: Storage = sessionStorage; // <--- you may switch between sessionStorage or LocalStrage (only one place to change)

    constructor() { }

    //Store userinfo from session storage
    storeUserInfo(userInfoString: string) {
        this.storage.setItem(this.currentUserKey, userInfoString);
    }

    //Store userinfo from session storage
    storeTokenInfo(token: string) {
        this.storage.setItem(this.currentToken, token);
    }


    //Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
        this.storage.removeItem(this.currentToken);
    }

    //Get userinfo from session storage
    getUserInfo(): UserInStorage | null {
        try {
            let userInfoString: string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                let userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
                return userObj;
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }



    
    isLoggedIn(): boolean {
        return this.storage.getItem(this.currentUserKey) === null ? false : true;
    }

    //Get User's Display name from session storage
    getUserName(): string {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.displayName
        }
        return "no-user";
    }


    //Get User's Display name from session storage
    getIdEmpresa(): string {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.empresaId
        }
        return "no-user";
    }

    insertIdAgencia(ageid:any,agename:any) {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            userObj.agenciaId = ageid;
            userObj.agenciaName = agename;
            this.storeUserInfo(JSON.stringify(userObj));
        }
       
    }
    getIdAgencia(): string {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.agenciaId
        }
        return "no-user";
    }
    getNameAgencia(): string {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.agenciaName
        }
        return "no-user";
    }
  
    getPathImagen(): string {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.path
        }
        return "no-user";
    }

     //Get User's Display name from session storage
     getIdUsuario(): string {
        let userObj: UserInStorage = this.getUserInfo();
        if (userObj !== null) {
            return userObj.userId
        }
        return "no-user";
    }

    getStoredToken(): string | null {
       // let userObj: UserInStorage = this.getUserInfo();
       // if (userObj !== null) {
       //     return userObj.token;
       // }

        let tokenObj : TokenStorage = JSON.parse(this.storage.getItem(this.currentToken));

        if(tokenObj !== null){
            return tokenObj.token;
        }
    }
}
