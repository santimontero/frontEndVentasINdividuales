import { Injectable } from '@angular/core';
/**
 * This is a singleton class
 */
@Injectable()
export class AppConfig {
    //Provide all the Application Configs here

    public version: string = "1.0.0";
    public locale: string = "en-US";
    public currencyFormat = { style: "currency", currency: "USD" };
    public dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
       // API Related configs
    public apiPort: string = "";
    public apiProtocol: string;
    public apiHostName: string;
    public baseApiPath: string;
    public baseApiPathAuth: string;




    constructor() {
        if (this.apiProtocol === undefined) {
            this.apiProtocol = "https";
        }
        if (this.apiHostName === undefined) {
            this.apiHostName =  "serviceout.segurosdelpichincha.com/BackendVentasIndividuales/";
        }
        if (this.apiPort === undefined) {
            this.apiPort = window.location.port;
        }
        if (this.apiHostName.includes("infomud") || this.apiHostName.includes("heroku")) {
            this.baseApiPath = this.apiProtocol + "://" + this.apiHostName ;
        }
        else {
            this.baseApiPath = this.apiProtocol + "://" + this.apiHostName ;
            this.baseApiPathAuth= this.apiProtocol + "://" + this.apiHostName ;
        }

    }


}
