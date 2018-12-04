import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  productos: any[];
  coberturas: any[];
  plazo: SelectItem[];
  constructor() {

    this.productos = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'},
      {name: 'New York2', code: 'NY2'},
      {name: 'Rome2', code: 'RM2'},
      {name: 'London2', code: 'LDN2'},
      {name: 'Istanbul2', code: 'IST2'},
      {name: 'Paris2', code: 'PRS2'}
  ];

   }

  ngOnInit() {
    this.plazo = [];
    this.plazo.push({ label: 'Periodo de tiempo', value: null });
    this.plazo.push({ label: 'Mensual', value: { id: 1, name: 'Mensual', code: 'M' } });
    this.plazo.push({ label: 'Trimestral', value: { id: 2, name: 'Trimestral', code: 'T' } });
    this.plazo.push({ label: 'Semestral', value: { id: 3, name: 'Semestral', code: 'S' } });
    this.plazo.push({ label: 'Anual', value: { id: 3, name: 'Anual', code: 'A' } });
  }

  seleccionarProducto(event){

    console.log(event.value);
    this.coberturas = [
      {name: 'New YorkSS', code: 'NYs'},
      {name: 'Romes', code: 'RMs'},
      {name: 'Londons', code: 'LDNs'},
      {name: 'Istanbuls', code: 'ISTs'},
      {name: 'Pariss', code: 'PRSs'},
      {name: 'New York2s', code: 'NY2s'},
      {name: 'Rome2s', code: 'RM2s'},
      {name: 'London2s', code: 'LDN2s'},
      {name: 'Istanbul2s', code: 'IST2s'},
      {name: 'Paris2s', code: 'PRS2s'}
  ];
  }

  siguiente() {
    this.enviarPadre.emit({ index: this.activeIndex + 1});
  
  }

  anterior() {
    this.enviarPadre.emit({ index: this.activeIndex - 1});
  }


}
