import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { timeout } from 'q';
import { empty } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cols: any[];
  datos: any[];
  lineData: any;
  labelDay: any[];
  procesados: number[];
  noProcesados: number[];

  vida: number[];
  accidentes: number[];
  incendio: number[];
  barData: any;
  option: any;
  constructor(private api: ApiRequestService,
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
    this.labelDay = [];
    this.procesados = [];
    this.noProcesados = [];
    this.vida = [];
    this.accidentes = [];
    this.incendio = [];

    this.option =
         {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    this.api.get('api/emision/dashboard?tipoId=' + this.api.getInfoUsuario().tipoIdent + '&identificacion=' + this.api.getInfoUsuario().identificacion + '&sel=1', 'cotizacion').subscribe(
      data => {

        if (data != null) {
        data.forEach(element => {

          this.labelDay.push(element.fecha)
        });
  
        this.api.get('api/emision/dashboard?tipoId=' + this.api.getInfoUsuario().tipoIdent + '&identificacion=' + this.api.getInfoUsuario().identificacion + '&sel=2', 'cotizacion').subscribe(
          data2 => {  
              data2.forEach(element => {

                var index = this.labelDay.indexOf(element.fecha)
                if (element.tra_procesado == "0") {
                  this.noProcesados[index] =+element.valor;
                if(this.procesados[index] <= 0)  this.procesados[index] = 0
                }else{
                  this.procesados[index] = +element.valor;
                  if(this.noProcesados[index] <= 0)  this.noProcesados[index] = 0
                }
            });
              this.lineData = {
                labels: this.labelDay,
                datasets: [
                  {
                    label: 'PROCESADA',
                    data:this.procesados,
                    fill: false,
                    borderColor: '#2162b0',
                    backgroundColor: '#2162b0'
                  },
                  {
                    label: 'NO PROCESADA',
                    data:   this.noProcesados,
                    fill: false,
                    borderColor: '#e02365',
                    backgroundColor: '#e02365'
                  }
                ]
              };
          });

          this.api.get('api/emision/dashboard?tipoId=' + this.api.getInfoUsuario().tipoIdent + '&identificacion=' + this.api.getInfoUsuario().identificacion + '&sel=3', 'cotizacion').subscribe(
            data3 => {  
              console.log(data3)
                data3.forEach(element => {
                  var index = this.labelDay.indexOf(element.fecha)
                  console.log(index)
                  if (element.tra_ramo == "01") {
                    this.vida[index] = +element.numero;
                  }else if (element.tra_ramo == "04"){
                    this.incendio[index] = +element.numero;

                  }else{
                    this.accidentes[index] = +element.numero;

                  }
                })
                this.barData = {
                  labels: this.labelDay,
                  datasets: [
                    {
                      label: 'ACCIDENTES PERSONALES',
                      backgroundColor: '#2162b0',
                      borderColor: '#2162b0',
                      data: this.accidentes
                    },
                    {
                      label: 'INCENDIO',
                      backgroundColor: '#e02365',
                      borderColor: '#e02365',
                      data: this.incendio
                    }
                    ,
                    {
                      label: 'VIDA COLECTIVA',
                      backgroundColor: '#74e866',
                      borderColor: '#74e866',
                      data: this.vida
                    }
                  ]
              
                };
              });

            
        }
      });
     
 


      



    this.api.get('api/emision/transxusuario?tipoId=' + this.api.getInfoUsuario().tipoIdent + '&identificacion=' + this.api.getInfoUsuario().identificacion, 'cotizacion').subscribe(
      data => {
        this.datos = data;
        this.datos.forEach(item => {
          item.estado_string = item.tra_procesado == 0 ? "NO PROCESADO" : "PROCESADO"
        })
        console.log(data);
      });
  }

}
