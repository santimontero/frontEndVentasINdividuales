import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';


/**
 * This is a singleton class
 */
export class AppMessages {
    //Provide all the Application Configs here

    public msgs: Message[] = [];
    constructor() {
        this.msgs = [];
    }

    public mensajeError(mensaje: string) {        
        this.msgs.push({ severity: 'error', summary: 'Error', detail: mensaje });
    }

    public mensajeAdvertencia(mensaje: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Advertencia', detail: mensaje });
    }

    public mensajeInformacion(mensaje: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Información', detail: mensaje });
    }

    public mensajeOK(mensaje: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'OK', detail: mensaje });
    }

    public mensaje(tipo: string, mensaje: string) {
        this.msgs = [];
        this.msgs.push({ severity: tipo.toLowerCase(), summary: '', detail: mensaje });
    }

    public mensajeServer(tipo: string, mensaje: string, titulo: string) {
        this.msgs = [];
        this.msgs.push({ severity: tipo.toLowerCase(), summary: titulo, detail: mensaje });
    }

    clear() {
        this.msgs = [];
    }

}