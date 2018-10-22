import { Component, OnInit } from '@angular/core';

import { ApiRequestService } from 'src/app/services/api-request.service';
import { AppComponent } from 'src/app/app.component';
import { URLSearchParams} from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Usuario } from 'src/app/domain/usuario';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayDialog: boolean;

  usuario: Usuario = {};

  selectedUsuarios: Usuario;

  newUsuario: boolean;

  usuarios: Usuario[];

  cols: any[];
  formulario: FormGroup;
  
  constructor(private api: ApiRequestService,
    private formBuilder: FormBuilder,
    public appComponent: AppComponent) {

  }

  nuevofurmulario() {
      return this.formulario = this.formBuilder.group({
        usu_codigo_usuario: ['',[Validators.required]],
        usu_nombre_usuario: ['',[Validators.required]],
        usu_mail: ['',[Validators.required]],
        usu_agencia: ['',[Validators.required]],
        usu_val_presupuesto: ['',],
        usu_nombre_asesor: ['',],
        usu_contrasenia: ['',[Validators.required]],
        usu_contrasenia_confirm: ['',[Validators.required]],
        usu_estado: ['A',],
        usu_usuario_crea: ['',],
      });  
  }   

  ngOnInit() {
    this.nuevofurmulario();
    this.api.get('/api/usuarios/listar', 'Usuarios').subscribe(
      res => {
        this.usuarios = res;
        this.usuarios.forEach(element => {
          console.log(element)
        })       
      }
    );

    this.cols = [
      { field: 'usu_codigo_usuario', header: 'Código' },
      { field: 'usu_nombre_usuario', header: 'Nombre completo' },
      { field: 'usu_mail', header: 'Correo electrónico' },
      { field: 'usu_agencia', header: 'Agencia' },
      { field: 'usu_usuario_crea', header: 'Usuario crea/modifica'}
  ];
  }

  showDialogToAdd() {
    this.newUsuario = true;
    this.usuario.usu_estado = 'A'
    this.displayDialog = true;
  }
  datosEnvio(){
    const envio = {
      usu_codigo_usuario: this.formulario.get('usu_codigo_usuario').value,
      usu_nombre_usuario: this.formulario.get('usu_nombre_usuario').value,
      usu_mail: this.formulario.get('usu_mail').value,
      usu_agencia: this.formulario.get('usu_agencia').value,
      usu_val_presupuesto: this.formulario.get('usu_val_presupuesto').value,
      usu_contrasenia: this.formulario.get('usu_contrasenia').value,
      usu_contrasenia_confirm: this.formulario.get('usu_contrasenia_confirm').value,
      usu_estado: this.formulario.get('usu_estado').value,
      //usu_usuario_crea: this.formulario.get('usu_usuario_crea').value,
  };
  console.log(envio)
  return envio;
  }

  save() {
    this.api.post('/api/usuarios/guardar/', this.datosEnvio(), 'Usuarios').subscribe(Data => {
      this.ngOnInit()
    }    
    ,error => {
      console.log(error)
    });
    this.displayDialog = false;
  }

  delete() {
    let params: URLSearchParams = new URLSearchParams();
                              params.set('id', this.selectedUsuarios.usu_codigo_usuario.toString());
      this.api.get('/api/usuarios/elimina', 'Usuarios',params).subscribe(
        res => {          
          this.ngOnInit();                   
        }
      );
      this.usuario = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newUsuario = false;
   
    this.formulario = this.formBuilder.group({
      usu_codigo_usuario: [this.selectedUsuarios.usu_codigo_usuario, Validators.required],
      usu_nombre_usuario: [this.selectedUsuarios.usu_nombre_usuario, Validators.required],
      usu_mail: [this.selectedUsuarios.usu_mail,],
      usu_agencia: [this.selectedUsuarios.usu_agencia, Validators.required],
      usu_val_presupuesto: [this.selectedUsuarios.usu_val_presupuesto,],
      usu_contrasenia: [this.selectedUsuarios.usu_contrasenia,],
      usu_contrasenia_confirm: [this.selectedUsuarios.usu_contrasenia_confirm,],
      usu_estado: ['A',],
      //usu_usuario_crea: [this.selectedUsuarios.usu_usuario_crea,],
    });

    this.displayDialog = true;
  }

  cloneEmpresa(c: Usuario): Usuario {
    let car = {};
    for (let prop in c) {
        car[prop] = c[prop];
    }
    return car;
  }

}
