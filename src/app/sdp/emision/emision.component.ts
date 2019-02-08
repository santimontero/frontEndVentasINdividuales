import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { from } from 'rxjs';
import { Emision } from 'src/app/domain/emision';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-emision',
  templateUrl: './emision.component.html',
  styleUrls: ['./emision.component.css']
})
export class EmisionComponent implements OnInit {
  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  productos: any[];
  coberturas: any[];
  plazo: SelectItem[];
  sumaaseg: number;
  prima: number;
  anual: number;

  constructor(private api: ApiRequestService, public appComponent: AppComponent) {
    // this.api.get('api/configuraciones/productosxasesor?tipoIdent=' + this.api.getInfoUsuario().tipoIdent + '&ident=' + this.api.getInfoUsuario().identificacion, 'cotizacion').subscribe(
    //   productosAsesor => {
    //     this.productos = productosAsesor;
    //   }
    // )
  }

  ngOnInit() {
    console.log(this.emision.formaPago.tipo_form_pago.name)
    this.plazo = [];
    this.plazo.push({ label: 'Periodo de tiempo', value: null });
    this.api.get('api/catalogos/frecuenciapago', 'cotizacion').subscribe(
      frecPag => {
        for (let i = 0; i < frecPag.length; i++) {
          var p = { label: frecPag[i].cat_descripcion, value: { id: (i + 1), name: frecPag[i].cat_descripcion, code: frecPag[i].cat_id_catalogo } };
          this.plazo.push(p);
        }
      }
    )

    this.sumaaseg = 0;
    this.prima = 0;
    this.anual = 0;
  }

  seleccionarProducto(event) {
    this.api.get('api/configuraciones/coberturasxproducto?ramo=' + event.value.pda_ramo + '&codigo=' + event.value.pda_codigo_plan, 'cotizacion').subscribe(
      coberturasProducto => {
        this.coberturas = coberturasProducto;
      }
    )
    this.api.get('api/configuraciones/sumaasegurada?ramo=' + event.value.pda_ramo + '&codigo=' + event.value.pda_codigo_plan, 'cotizacion').subscribe(
      sumaAsegurada => {
        this.sumaaseg = sumaAsegurada;
      }
    )
    this.api.get('api/configuraciones/primaanual?ramo=' + event.value.pda_ramo + '&codigo=' + event.value.pda_codigo_plan, 'cotizacion').subscribe(
      primaA => {
        this.anual = primaA;
      }
    )
    this.prima = 0;
  }

  seleccionarPlazo(event) {

    if (this.anual > 0) {
      switch (event.value.code) {
        case 'A':
          this.prima = this.anual
          break;
        case 'M':
          this.prima = this.anual / 12;
          break;
        case 'T':
          this.prima = this.anual / 4;
          break;
        case 'S':
          this.prima = this.anual / 2;
          break;

        default:
          this.prima = 0;
          break;
      }
    }
  }

  siguiente() {

    /// objeto a enviarse a guardar

    console.log(this.emision)
    this.appComponent.loader = true;
    this.api.post('api/emision/guardar', this.emision, 'emision').subscribe(Data => {
      this.appComponent.loader = false;
      if (Data.resultado == "OK") {
        this.appComponent.loader = false;
        this.appComponent.message('success', 'Emisión', 'Negocio emitido correctamente');
        this.enviarPadre.emit({ index: 0, emision: this.emision });
      }
      else {
        this.appComponent.loader = false;
        this.appComponent.message('error', 'Emisión', Data.resultado);
      }
    });

  }

  anterior() {
    this.enviarPadre.emit({ index: this.activeIndex - 1, emision: this.emision });
  }

}
