import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cols: any[];
  datos:any[]
  constructor(  private api: ApiRequestService,
    private formBuilder: FormBuilder,
    public appComponent: AppComponent) { 

      this.cols = [
        { field: 'tra_num_identidad', header: 'Identificación' },
        { field: 'nombresapellidos', header: 'Nombre' },
        { field: 'estado_string', header: 'Estado' },
        { field: 'tra_producto', header: 'Producto' },

      ];
    }

  ngOnInit() {

    this.api.get('api/emision/transxusuario?tipoId=' + this.api.getInfoUsuario().tipoIdent+ '&identificacion=' + this.api.getInfoUsuario().identificacion, 'cotizacion').subscribe(
      data => {
        this.datos = data;
        this.datos.forEach(item=>{
            item.estado_string = item.tra_procesado==0? "NO PROCESADO":"PROCESADO"
        })
      console.log(data);  
      });
  }

}
