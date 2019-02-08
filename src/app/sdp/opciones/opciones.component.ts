import { Component, OnInit } from '@angular/core';


import { ApiRequestService } from 'src/app/services/api-request.service';
import { Http } from '@angular/http';
import { AppComponent } from 'src/app/app.component';
import { ConfirmationService } from 'primeng/primeng';
import { Opcion } from 'src/app/domain/opcion';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { URLSearchParams } from '@angular/http';
@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  displayDialog: boolean;

  opcion: Opcion = {};

  selectedopciones: Opcion;

  newOpcion: boolean;

  opciones: Opcion[];

  cols: any[];
  formulario: FormGroup;

  constructor(
    private api: ApiRequestService,
    private formBuilder: FormBuilder,
    public appComponent: AppComponent) {

  }

  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      opc_codigo_opcion: ['',],
      opc_url: ['', [Validators.required]],
      opc_estado: ['', ],
      opc_descripcion: ['', Validators.required],

    });


  }
  ngOnInit() {
    this.nuevofurmulario();
    this.api.get('/api/Opciones/listar', 'Opciones').subscribe(
      res => {
        this.opciones = res;
        this.opciones.forEach(element => {
         

        })

      }
    );

    this.cols = [
      { field: 'opc_codigo_opcion', header: 'Codigo' },
      { field: 'opc_descripcion', header: 'Descripcion' },
      { field: 'opc_url', header: 'URL' }
    ];


  }

  showDialogToAdd() {
    this.newOpcion = true;
    this.nuevofurmulario();
    this.formulario.patchValue({
      opc_estado: 'A'
    })
    this.displayDialog = true;
  }
  datosEnvio() {
    const envio = {
      opc_codigo_opcion: this.formulario.get('opc_codigo_opcion').value,
      opc_url: this.formulario.get('opc_url').value,
      opc_descripcion: this.formulario.get('opc_descripcion').value,
      opc_estado: this.formulario.get('opc_estado').value
        };
   
    return envio;
  }

  save() {

    if (this.formulario.valid) {
    this.api.post('/api/opciones/guardar/', this.datosEnvio(), 'Opcion').subscribe(Data => {
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
    params.set('id', this.selectedopciones.opc_codigo_opcion.toString());
    this.api.get('/api/opciones/elimina', 'opciones', params).subscribe(
      res => {

        this.ngOnInit();



        this.appComponent.message('success', 'Exitoso', 'Se borro correctamente.');
     
      }
        , error => {
      this.appComponent.message('error', 'Error', error);
       
          console.log(error)
        }
    );
    this.opcion = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newOpcion = false;

    this.formulario = this.formBuilder.group({
      opc_codigo_opcion: [this.selectedopciones.opc_codigo_opcion,],
      opc_url: [this.selectedopciones.opc_url, [Validators.required]],
      opc_estado: [this.selectedopciones.opc_estado, Validators.required],
      opc_descripcion: [this.selectedopciones.opc_descripcion, Validators.required]
    });

    this.displayDialog = true;
  }

  cloneOpcion(c: Opcion): Opcion {
    let car = {};
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }

}
