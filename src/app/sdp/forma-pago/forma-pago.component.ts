import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, FormaPago } from 'src/app/domain/emision';
@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.css']
})
export class FormaPagoComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
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
    this.appComponent.loader = true; 
    this.api.get('api/catalogos/formaspago', 'forma_pago').subscribe(
      formpag => {
        for (let i = 0; i < formpag.length; i++) {
          var p = { label: formpag[i].cat_descripcion, value: { id: (i + 1), name: formpag[i].cat_descripcion, code: formpag[i].cat_id_catalogo } };
          this.tipo_form_pago.push(p);
        }
        this.appComponent.loader = false; 
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
    if (this.emision.formaPago != null) {
      this.appComponent.loader = true; 
    setTimeout(() => { 
        this.cargarfurmulario();
        this.appComponent.loader = false; 
    }, 1000);
    }
  }
  

  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_form_pago: new FormControl('', Validators.required),
      banco: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      tipo_tarjeta: new FormControl(''),
      pais_emisor: new FormControl(''),
      ano_caducidad: new FormControl(''),
      mes_caducidad: new FormControl(''),
      cvv: new FormControl(''),
    });


  }
  cargarfurmulario() {
 
    return this.formulario = this.formBuilder.group({
      tipo_form_pago: new FormControl(this.emision.formaPago.tipo_form_pago, Validators.required),
      banco: new FormControl(this.emision.formaPago.banco, Validators.required),
      numero: new FormControl(this.emision.formaPago.numero, Validators.required),
      tipo_tarjeta: new FormControl(this.emision.formaPago.tipo_tarjeta),
      pais_emisor: new FormControl(this.emision.formaPago.pais_emisor),
      ano_caducidad: new FormControl(this.emision.formaPago.ano_caducidad),
      mes_caducidad: new FormControl(this.emision.formaPago.mes_caducidad),
      cvv: new FormControl(this.emision.formaPago.cvv),
    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }


  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando


      var form = this.formulario.getRawValue();
      var error = 0;
      if(form.tipo_form_pago === 21 &&( form.tipo_tarjeta == ""||  form.pais_emisor == ""||  form.ano_caducidad == "" || form.mes_caducidad == "") ){
     
        this.appComponent.message('error','Error', 'Todos los campos de la tarjeta de crédito son obligatorios');
    error = error + 1;
      }

      if(error === 0){
        this.emision.formaPago = new FormaPago();
        this.emision.formaPago = form; 
        console.log( this.emision)
       this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });
       }
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
    this.enviarPadre.emit({ index: this.activeIndex - 1, emision: this.emision });
  }
}


