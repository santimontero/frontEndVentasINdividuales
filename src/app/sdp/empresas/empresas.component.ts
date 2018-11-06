import { Component, OnInit } from '@angular/core';


import { ApiRequestService } from 'src/app/services/api-request.service';
import { Http } from '@angular/http';
import { AppComponent } from 'src/app/app.component';
import { ConfirmationService } from 'primeng/primeng';
import { Empresa } from 'src/app/domain/empresa';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { URLSearchParams } from '@angular/http';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  displayDialog: boolean;

  empresa: Empresa = {};

  selectedEmpresas: Empresa;

  newEmpresa: boolean;

  empresas: Empresa[];

  cols: any[];
  formulario: FormGroup;

  constructor(
    private api: ApiRequestService,
    private formBuilder: FormBuilder,
    public appComponent: AppComponent) {

  }

  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      emp_id_empresa: ['',],
      emp_ruc: ['', [Validators.required]],
      emp_razon_social: ['', Validators.required],
      emp_tipo: ['', Validators.required],
      emp_email: ['', Validators.required],
      emp_estado: ['A',],
      emp_usuario: ['',],
      emp_cod_desc: ['', Validators.required],
    });


  }
  ngOnInit() {
    this.nuevofurmulario();
    this.api.get('/api/empresas/listar', 'Empresas').subscribe(
      res => {
        this.empresas = res;
        this.empresas.forEach(element => {
          console.log(element)
        })
      }
    );

    this.cols = [
      { field: 'emp_ruc', header: 'Ruc' },
      { field: 'emp_razon_social', header: 'Razón social' },
      { field: 'emp_tipo', header: 'Tipo (B)roker o (S)ponsor' },
      { field: 'emp_email', header: 'Correo electrónico' },
      { field: 'emp_cod_desc', header: 'Código descriptivo' }
    ];


  }

  showDialogToAdd() {
    this.newEmpresa = true;
    this.empresa.emp_estado = 'A'
    this.empresa.emp_usuario = 'Santiago'
    this.empresa.emp_id_empresa = 0
    this.displayDialog = true;
  }
  datosEnvio() {
    const envio = {
      emp_id_empresa: this.formulario.get('emp_id_empresa').value,
      emp_ruc: this.formulario.get('emp_ruc').value,
      emp_razon_social: this.formulario.get('emp_razon_social').value,
      emp_tipo: this.formulario.get('emp_tipo').value,
      emp_email: this.formulario.get('emp_email').value,
      emp_estado: this.formulario.get('emp_estado').value,
      emp_usuario: this.formulario.get('emp_usuario').value,
      emp_cod_desc: this.formulario.get('emp_cod_desc').value,
    };
    console.log(envio)
    return envio;
  }

  save() {


    this.api.post('/api/empresas/guardar/', this.datosEnvio(), 'Empresa').subscribe(Data => {
      this.ngOnInit()

    }
      , error => {
        console.log(error)
      }

    );;
    this.displayDialog = false;

  }

  delete() {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id', this.selectedEmpresas.emp_id_empresa.toString());
    this.api.get('/api/empresas/elimina', 'Empresas', params).subscribe(
      res => {
        this.ngOnInit();
      }
    );
    this.empresa = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newEmpresa = false;

    this.formulario = this.formBuilder.group({
      emp_id_empresa: [this.selectedEmpresas.emp_id_empresa,],
      emp_ruc: [this.selectedEmpresas.emp_ruc, [Validators.required]],
      emp_razon_social: [this.selectedEmpresas.emp_razon_social, Validators.required],
      emp_tipo: [this.selectedEmpresas.emp_tipo, Validators.required],
      emp_email: [this.selectedEmpresas.emp_email, Validators.required],
      emp_estado: [this.selectedEmpresas.emp_estado,],
      emp_usuario: [this.selectedEmpresas.emp_usuario,],
      emp_cod_desc: [this.selectedEmpresas.emp_cod_desc,],
    });

    this.displayDialog = true;
  }

  cloneEmpresa(c: Empresa): Empresa {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }

}
