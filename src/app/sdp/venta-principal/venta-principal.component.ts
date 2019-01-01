import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Emision } from 'src/app/domain/emision';

@Component({
  selector: 'app-venta-principal',
  templateUrl: './venta-principal.component.html',
  styleUrls: ['./venta-principal.component.scss']
})
export class VentaPrincipalComponent implements OnInit {
  items: MenuItem[];

  activeIndex: number = 0;
  emision: Emision;
  constructor() { }

  ngOnInit() {
    this.emision  = new Emision();
    this.items = [{
      label: 'Cotización',
      command: (event: any) => {
        this.activeIndex = 0;

      }
    },
    {
      label: 'Cliente ',
      command: (event: any) => {
        this.activeIndex = 1;

      }
    },
    {
      label: 'Dirección',
      command: (event: any) => {
        this.activeIndex = 2;

      }
    },
    {
      label: 'Financiera',
      command: (event: any) => {
        this.activeIndex = 3;

      }
    }
    ,
    {
      label: 'Forma de Pago',
      command: (event: any) => {
        this.activeIndex = 4;

      }
    },
    {
      label: 'Beneficiarios',
      command: (event: any) => {
        this.activeIndex = 5;

      }
    }
    ,
    {
      label: 'Datos de Facturación',
      command: (event: any) => {
        this.activeIndex = 6;

      }
    }
    ,
    {
      label: 'Emitir',
      command: (event: any) => {
        this.activeIndex = 7;

      }
    }
    ];

  }





  public cerrarParcial(event) {

    this.activeIndex  = event.index;

  }


}
