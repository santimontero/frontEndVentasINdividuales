import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { ActivatedRoute, Router } from '@angular/router';
import { RecuperarCuentaService } from 'src/app/services/recuperar-cuenta.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.css', '../login/login.component.scss'],
  providers: [MessageService, RecuperarCuentaService]
})
export class RecuperarCuentaComponent implements OnInit {
  formulario: FormGroup;
  model: any = {};
  public msgs: Message[] = [];
  mensajeInicio: any;
  lenguajeSeleccionado: string;
  loader: boolean = false;

  constructor(
    private ars: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private recuperarCuentaService: RecuperarCuentaService) {
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

  showError(msj: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msj });
  }

  showMessage(msj: string) {
    this.messageService.add({ severity: 'success', summary: '', detail: msj });
  }

  sendPassw() {
    this.clearViaService();
    if (this.model != null && this.model.email2send != undefined) {
      this.loader = true; //activar cargando
      this.recuperarCuentaService.sendMail4NewPassw(this.model.email2send).subscribe(
        (data: string) => {
   
          this.loader = false;
          this.model.email2send = '';
          //this.router.navigate(['/login']);
          this.showMessage('Se le ha enviado al correo electrónico la nueva contraseña');          
        },
        error => {
          this.loader = false;
          this.model.email2send = '';
          this.showError(error);
        }
      )
    }
    else {
      this.loader = false; //activar cargando
      this.showError('El campo correo electrónico es obligatorio');
    }
  }

  clearViaService() {
    this.messageService.clear();
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  public mensaje(tipo: string, mensaje: string) {
    this.msgs = [];
    this.messageService.add({ severity: tipo.toLowerCase(), summary: '', detail: mensaje });
  }
}
