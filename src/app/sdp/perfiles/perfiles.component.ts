import { Component, OnInit } from '@angular/core';


import { ApiRequestService } from 'src/app/services/api-request.service';
import { Http } from '@angular/http';
import { AppComponent } from 'src/app/app.component';
import { ConfirmationService } from 'primeng/primeng';
import { Perfil } from 'src/app/domain/perfil';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { URLSearchParams } from '@angular/http';
@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {
  displayDialog: boolean;

 

  selectedPerfiles: Perfil;

  newPerfil: boolean;

  perfiles: Perfil[];

  cols: any[];
  formulario: FormGroup;

  constructor(
    private api: ApiRequestService,
    private formBuilder: FormBuilder,
    public appComponent: AppComponent) {

  }

  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      per_codigo_perfil: ['',],
      per_descripcion: ['', [Validators.required]],
      per_estado: ['', ]

    });


  }
  ngOnInit() {
    this.nuevofurmulario();
    this.api.get('/api/Perfiles/listar', 'Perfiles').subscribe(
      res => {
        this.perfiles = res;
        this.perfiles.forEach(element => {
 

        })

      }
    );

    this.cols = [
      { field: 'per_codigo_perfil', header: 'Codigo perfil' },
      { field: 'per_descripcion', header: 'Perfil descripción' }
    ];


  }

  showDialogToAdd() {
    this.newPerfil = true;
    this.nuevofurmulario();
    this.formulario.patchValue({
      per_estado: 'A'
    })
    this.displayDialog = true;
  }
  datosEnvio() {
    const envio = {
      per_codigo_perfil: this.formulario.get('per_codigo_perfil').value,
      per_descripcion: this.formulario.get('per_descripcion').value,
      per_estado: this.formulario.get('per_estado').value
        };

    return envio;
  }

  save() {

    if (this.formulario.valid) {
    this.api.post('/api/Perfiles/guardar/', this.datosEnvio(), 'Perfil').subscribe(Data => {
      this.ngOnInit()

      this.appComponent.message('success', 'Exitoso', 'Se guardo correctamente.');
     
    }
      , error => {
    this.appComponent.message('error', 'Error', error);
     
        console.log(error)
      }

    );;
    this.displayDialog = false;
  } else {
    Object.keys(this.formulario.controls).forEach(field => { // {1}
      const control = this.formulario.get(field);
      control.markAsDirty({ onlySelf: true });            // {2}
      control.markAsTouched({ onlySelf: true });       // {3}
    });

  }
  }

  delete() {

    let params: URLSearchParams = new URLSearchParams();
    params.set('id', this.selectedPerfiles.per_codigo_perfil.toString());
    this.api.get('/api/Perfiles/elimina', 'Perfiles', params).subscribe(
      res => {

        this.ngOnInit();

        this.appComponent.message('success', 'Exitoso', 'Se borro correctamente.');
     
      }
        , error => {
      this.appComponent.message('error', 'Error', error);
       
          console.log(error)
        }
    );

    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newPerfil = false;

    this.formulario = this.formBuilder.group({
      per_codigo_perfil: [this.selectedPerfiles.per_codigo_perfil,],
      per_descripcion: [this.selectedPerfiles.per_descripcion, [Validators.required]],
      per_estado: [this.selectedPerfiles.per_estado, Validators.required],
     });

    this.displayDialog = true;
  }

  clonePerfil(c: Perfil): Perfil {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }

}
