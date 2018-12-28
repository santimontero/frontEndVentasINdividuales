import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.css']
})
export class FormaPagoComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  tipo_form_pago: SelectItem[];
  bancos: SelectItem[];
  tipo_tarjeta: SelectItem[];
  pais_emisor: SelectItem[];
  mes: SelectItem[];
  es: any;
  formulario: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public appComponent: AppComponent, private api: ApiRequestService) {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }

  }

  ngOnInit() {
    this.nuevofurmulario();
    this.tipo_form_pago = [];
    this.api.get('api/catalogos/formaspago', 'forma_pago').subscribe(
      formpag => {
        for (let i = 0; i < formpag.length; i++) {
          var p = { label: formpag[i].cat_descripcion, value: { id: (i + 1), name: formpag[i].cat_descripcion, code: formpag[i].cat_id_catalogo } };
          this.tipo_form_pago.push(p);
        }
      }
    )

    this.bancos = [];
    this.api.get('api/catalogos/bancos', 'forma_pago').subscribe(
      bcos => {
        for (let i = 0; i < bcos.length; i++) {
          var p = { label: bcos[i].cat_descripcion, value: { id: (i + 1), name: bcos[i].cat_descripcion, code: bcos[i].cat_id_catalogo } };
          this.bancos.push(p);
        }
      }
    )

    this.tipo_tarjeta = [];
    this.api.get('api/catalogos/tarjetas', 'forma_pago').subscribe(
      tarj => {
        for (let i = 0; i < tarj.length; i++) {
          var p = { label: tarj[i].cat_descripcion, value: { id: (i + 1), name: tarj[i].cat_descripcion, code: tarj[i].cat_id_catalogo } };
          this.tipo_tarjeta.push(p);
        }
      }
    )

    this.pais_emisor = [];
    this.api.get('api/catalogos/paises', 'forma_pago').subscribe(
      paisemi => {
        for (let i = 0; i < paisemi.length; i++) {
          var p = { label: paisemi[i].cat_descripcion, value: { id: (i + 1), name: paisemi[i].cat_descripcion, code: paisemi[i].cat_id_catalogo } };
          this.pais_emisor.push(p);
        }
      }
    )

    this.mes = [];
    this.api.get('api/catalogos/meses', 'forma_pago').subscribe(
      meses => {
        for (let i = 0; i < meses.length; i++) {
          var p = { label: meses[i].cat_descripcion, value: { id: (i + 1), name: meses[i].cat_descripcion, code: meses[i].cat_id_catalogo } };
          this.mes.push(p);
        }
      }
    )

  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_form_pago: new FormControl(''),
      banco: new FormControl(''),
      numero: new FormControl('', Validators.required),
      tipo_tarjeta: new FormControl(''),
      pais_emisor: new FormControl(''),
      ano_caducidad: new FormControl(''),
      mes_caducidad: new FormControl(''),
      cvv: new FormControl(''),
    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }


  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando
      this.enviarPadre.emit({ index: this.activeIndex + 1 });

      this.appComponent.loader = false; //desactivar cargando 
    } else {
      Object.keys(this.formulario.controls).forEach(field => { // {1}
        const control = this.formulario.get(field);
        control.markAsDirty({ onlySelf: true });            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });

    }
  }

  anterior() {
    this.enviarPadre.emit({ index: this.activeIndex - 1 });
  }
}


