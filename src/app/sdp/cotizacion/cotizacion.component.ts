import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { from } from 'rxjs';
import { Emision, Cotizacion } from 'src/app/domain/emision';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  productos: any[];
  coberturas: any[];
  plazo: SelectItem[];
  sumaaseg: number;
  prima: number;
  anual: number;
  fren_pago:any;

  constructor( public appComponent: AppComponent,private api: ApiRequestService) {
    this.appComponent.loader = true;
    this.api.get('api/configuraciones/productosxasesor?tipoIdent=' + this.api.getInfoUsuario().tipoIdent + '&ident=' + this.api.getInfoUsuario().identificacion, 'cotizacion').subscribe(
      productosAsesor => {
        this.productos = productosAsesor;
        this.appComponent.loader = false;
      }
    )
  }

  ngOnInit() {
    this.emision=new Emision();
    this.plazo = [];
    this.plazo.push({ label: 'Periodo de tiempo', value: null });
    this.api.get('api/catalogos/frecuenciapago', 'cotizacion').subscribe(
      frecPag => {
        for (let i = 0; i < frecPag.length; i++) {
          var p = { label: frecPag[i].cat_descripcion, value: { name: frecPag[i].cat_descripcion, code: frecPag[i].cat_id_catalogo } };
          this.plazo.push(p);
        }
      }
    )

    this.sumaaseg = 0;
    this.prima = 0;
    this.anual = 0;
  }

  seleccionarProducto(event) {
    this.emision.cotizacion = new Cotizacion();
    this.emision.cotizacion.pda_codigo_canal_subc= event.value.pda_codigo_canal_subc;
    this.emision.cotizacion.pda_codigo_conf_prd= event.value.pda_codigo_conf_prd;
    this.emision.cotizacion.pda_codigo_plan= event.value.pda_codigo_plan;
    this.emision.cotizacion.pda_descrip_conf_prod= event.value.pda_descrip_conf_prod;
    this.emision.cotizacion.pda_num_identifica_asesor= event.value.pda_num_identifica_asesor;
    this.emision.cotizacion.pda_ramo= event.value.pda_ramo;
    this.emision.cotizacion.pda_solicita_intermediario= event.value.pda_solicita_intermediario;
    this.emision.cotizacion.pda_tipo_asesor= event.value.pda_tipo_asesor;

    this.fren_pago = null;

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

    if (this.anual > 0 && event.value !=null) {
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

        default:
          this.prima = 0;
          break;
      }
    }else{
      this.prima = 0;
    }
  }

  siguiente() {
  
    this.emision.cotizacion.prima= this.anual; 
    this.emision.cotizacion.suma_aseg= this.sumaaseg;
    this.emision.cotizacion.fren_pago= this.fren_pago;
    this.emision.cotizacion.coberturas= this.coberturas;


    this.enviarPadre.emit({ index: this.activeIndex + 1,emision: this.emision  });

  }

  anterior() {
    this.enviarPadre.emit({ index: this.activeIndex - 1,emision: this.emision  });
  }


}
