import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-financiero',
  templateUrl: './financiero.component.html',
  styleUrls: ['./financiero.component.css']
})
export class FinancieroComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  tipo_tit: SelectItem[];
  tipo_iden: SelectItem[];
  tipo_parentesco: SelectItem[];
  patrimonio: SelectItem[];
  Ingreso: SelectItem[];
  Ocupacion: SelectItem[];
  Act_econo: SelectItem[];
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
    this.tipo_tit = [];

    this.tipo_tit.push({ label: 'Si', value: 0 });
    this.tipo_tit.push({ label: 'No', value: 1 });
    this.tipo_iden = [];
    this.api.get('api/catalogos/tipoid', 'financiero').subscribe(
      tipoid => {
        for (let i = 0; i < tipoid.length; i++) {
          var p = { label: tipoid[i].cat_descripcion, value: { id: (i + 1), name: tipoid[i].cat_descripcion, code: tipoid[i].cat_id_catalogo } };
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

  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tit_cuenta: new FormControl(''),
      tip_ident: new FormControl(''),
      ident_tit: new FormControl(''),
      nom_tit: new FormControl(''),
      paren_tit: new FormControl(''),
      ran_ingreso: new FormControl(''),
      med_ingreso: new FormControl('', Validators.required),
      ran_patrimonio: new FormControl(''),
      med_patrimonio: new FormControl('', Validators.required),

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


