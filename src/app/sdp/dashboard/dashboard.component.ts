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
  datos:any[];
  lineData: any;

  barData: any;
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


    this.lineData = {
      labels: ['21-01-2019', '22-01-2019', '23-01-2019', '24-01-2019', '25-01-2019', '26-01-2019', '27-01-2019'],
      datasets: [
          {
              label: 'PROCESADA',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#2162b0',
              backgroundColor: '#2162b0'
          },
          {
              label: 'NO PROCESADA',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#e02365',
              backgroundColor: '#e02365'
          }
      ]
  };

  this.barData = {
    labels: ['21-01-2019', '22-01-2019', '23-01-2019', '24-01-2019', '25-01-2019', '26-01-2019', '27-01-2019'],
      datasets: [
          {
              label: 'ACCIDENTES PERSONALES',
              backgroundColor: '#2162b0',
              borderColor: '#2162b0',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'INCENDIO',
              backgroundColor: '#e02365',
              borderColor: '#e02365',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
          ,
          {
              label: 'VIDA COLECTIVA',
              backgroundColor: '#74e866',
              borderColor: '#74e866',
              data: [18, 28, 20, 39, 56, 17, 80]
          }
      ]
  };


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
