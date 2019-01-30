import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, Financiero } from 'src/app/domain/emision';

@Component({
  selector: 'app-financiero',
  templateUrl: './financiero.component.html',
  styleUrls: ['./financiero.component.css']
})
export class FinancieroComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  tipo_tit: SelectItem[];
  tipo_iden: SelectItem[];
  tipo_parentesco: SelectItem[];
  patrimonio: SelectItem[];
  Ingreso: SelectItem[];
  Ocupacion: SelectItem[];
  Act_econo: SelectItem[];
  es: any;
  formulario: FormGroup;
  ingBus: any;
  ingPat: any;
  maxIngreso: number;
  maxPatri: number;
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
    this.tipo_tit = [];

    this.tipo_tit.push({ label: 'Si', value: 'S' });
    this.tipo_tit.push({ label: 'No', value: 'N' });
    this.tipo_iden = [];
    this.api.get('api/catalogos/tipoid', 'financiero').subscribe(
      tipoid => {
        for (let i = 0; i < tipoid.length; i++) {
          var p = { label: tipoid[i].cat_descripcion, value:  tipoid[i].cat_id_catalogo  };
          this.tipo_iden.push(p);
        }
      }
    )

    this.tipo_parentesco = [];
    this.api.get('api/catalogos/parentescos', 'financiero').subscribe(
      parent => {
        for (let i = 0; i < parent.length; i++) {
          var p = { label: parent[i].cat_descripcion, value: { id: (i + 1), name: parent[i].cat_descripcion, code: parent[i].cat_id_catalogo } };
          this.tipo_parentesco.push(p);
        }
      }
    )

    this.patrimonio = [];
    this.api.get('api/catalogos/rangospatrimonios', 'financiero').subscribe(
      patr => {
        for (let i = 0; i < patr.length; i++) {
          var p = { label: patr[i].cat_descripcion, value: { id: (i + 1), name: patr[i].cat_descripcion, code: patr[i].cat_id_catalogo } };
          this.patrimonio.push(p);
        }

      }
    )

    this.Ingreso = [];
    this.api.get('api/catalogos/rangosingresos', 'financiero').subscribe(
      ingr => {
        for (let i = 0; i < ingr.length; i++) {
          var p = { label: ingr[i].cat_descripcion, value: { id: (i + 1), name: ingr[i].cat_descripcion, code: ingr[i].cat_id_catalogo } };
          this.Ingreso.push(p);
        }

      }
    )

    this.Ocupacion = [];
    this.api.get('api/catalogos/ocupaciones', 'financiero').subscribe(
      ocupa => {
        for (let i = 0; i < ocupa.length; i++) {
          var p = { label: ocupa[i].cat_descripcion, value: { id: (i + 1), name: ocupa[i].cat_descripcion, code: ocupa[i].cat_id_catalogo } };
          this.Ocupacion.push(p);
        }
      }
    )

    this.Act_econo = [];
    this.api.get('api/catalogos/actividades', 'financiero').subscribe(
      acteco => {
        for (let i = 0; i < acteco.length; i++) {
          var p = { label: acteco[i].cat_descripcion, value: { id: (i + 1), name: acteco[i].cat_descripcion, code: acteco[i].cat_id_catalogo } };
          this.Act_econo.push(p);
        }
      }
    )


    if (this.emision.financiero != null) {
      this.appComponent.loader = true;
      setTimeout(() => {
        this.cargarfurmulario();
        this.appComponent.loader = false;
      }, 500);
    }

  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tit_cuenta: new FormControl('', Validators.required),
      tip_ident: new FormControl(''),
      ident_tit: new FormControl(''),
      nom_tit: new FormControl(''),
      paren_tit: new FormControl(''),
      ran_ingreso: new FormControl('', Validators.required),
      med_ingreso: new FormControl('', Validators.required),
      ran_patrimonio: new FormControl('', Validators.required),
      med_patrimonio: new FormControl('', Validators.required),
      ocupa: new FormControl('', Validators.required),
      act_eco: new FormControl('', Validators.required),
    });


  }
  cargarfurmulario() {
    return this.formulario = this.formBuilder.group({
      tit_cuenta: new FormControl(this.emision.financiero.tit_cuenta, Validators.required),
      tip_ident: new FormControl(this.emision.financiero.tip_ident),
      ident_tit: new FormControl(this.emision.financiero.ident_tit),
      nom_tit: new FormControl(this.emision.financiero.nom_tit),
      paren_tit: new FormControl(this.emision.financiero.paren_tit),
      ran_ingreso: new FormControl(this.emision.financiero.ran_ingreso, Validators.required),
      med_ingreso: new FormControl(this.emision.financiero.med_ingreso, Validators.required),
      ran_patrimonio: new FormControl(this.emision.financiero.ran_patrimonio, Validators.required),
      med_patrimonio: new FormControl(this.emision.financiero.med_patrimonio, Validators.required),
      ocupa: new FormControl(this.emision.financiero.ocupa, Validators.required),
      act_eco: new FormControl(this.emision.financiero.act_eco, Validators.required),
    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }


  siguiente() {

    if (this.formulario.valid) {
    

      var form = this.formulario.getRawValue();
      var error = 0;
      if (form.tit_cuenta === "N" && (form.tip_ident == "" || form.ident_tit == "" || form.nom_tit == "" || form.paren_tit == "")) {

        this.appComponent.message('error', 'Error', 'Todos los campos del titular de la cuenta son obligatorios');
        error = error + 1;
      }
      if (this.ingBus == -1 && form.med_ingreso < this.maxIngreso) {
        this.appComponent.message('warn', 'Alerta', 'El valor del Ingresos debe ser mayor a ' + this.maxIngreso);
        error = error + 1;
      }
      if (this.ingPat == -1 && form.med_patrimonio < this.maxPatri) {
        this.appComponent.message('warn', 'Alerta', 'El valor del Patrimonio debe ser mayor a ' + this.maxPatri);
        error = error + 1;
      }
      if (error === 0) {
console.log(form)
        this.appComponent.loader = true; //activar cargando
        this.api.get('api/cliente/validaidentificacion?tipoId=' + form.tip_ident + '&identificacion=' + form.ident_tit, 'cotizacion').subscribe(
          valCe => {

console.log(valCe)
            if (valCe.resultado == "OK") {  
              this.appComponent.loader = false; 

              this.emision.financiero = new Financiero();
              this.emision.financiero = form;
              this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });
            } else {
              this.appComponent.loader = false; 
              this.appComponent.message('warn', 'Validación Identificación', valCe.resultado);

            }
          }
        )
      }
    //desactivar cargando 
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

  seleccionarIngreso(event) {

    var valor = event.value.name.replace(/ /g, "").replace(',', "");
    this.ingBus = valor.indexOf('-');
    if (this.ingBus != -1) {
      var menor = + valor.substring(0, this.ingBus);
      var mayor = + valor.substring(this.ingBus + 1);
      this.formulario.patchValue({ med_ingreso: ((mayor + menor) / 2) });
    } else {
      var b = valor.indexOf('>')
      this.formulario.patchValue({ med_ingreso: 0 });
      this.maxIngreso = + valor.substring(b + 1);

    }

  }
  seleccionarPatrimonio(event) {
    var valor = event.value.name.replace(/ /g, "");
    this.ingPat = valor.indexOf('-');
    if (this.ingPat != -1) {
      var menor = + valor.substring(0, this.ingPat).replace(',', "");
      var mayor = + valor.substring(this.ingPat + 1).replace(',', "");
      this.formulario.patchValue({ med_patrimonio: ((mayor + menor) / 2) });
    } else {
      var b = valor.indexOf('>')
      this.formulario.patchValue({ med_patrimonio: 0 });
      console.log(b)
      console.log(valor)
      this.maxPatri = +valor.substring(b + 1).replace(',', "");;
console.log( this.maxPatri )
    }
  }
}


