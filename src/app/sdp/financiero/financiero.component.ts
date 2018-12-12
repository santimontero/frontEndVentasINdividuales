import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';

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
  es: any;
  formulario: FormGroup;
  constructor( private formBuilder: FormBuilder,
    public appComponent: AppComponent) { 
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
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
    this.tipo_iden.push({ label: 'cedula',value: 0 });
    this.tipo_iden.push({ label: 'ruc',value: 1 });

    this.tipo_parentesco = [];
    this.tipo_parentesco.push({ label: 'Padre', value:  1,  });
    this.tipo_parentesco.push({ label: 'Hijo', value:  2, });
   
    this.patrimonio = [];
    this.patrimonio.push({ label: '10000-50000', value:  1});
    this.patrimonio.push({ label: '50000-20000', value:2 });
  
  
    this.Ingreso = [];
    this.Ingreso.push({ label: '1000-5000', value:  1});
    this.Ingreso.push({ label: '5000-10000', value:2 });
  
  
  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tit_cuenta:  new FormControl('', ),
      tip_ident: new FormControl('',),
      ident_tit:  new FormControl('', ),
      nom_tit:  new FormControl('',),
      paren_tit:  new FormControl('',),
      ran_ingreso:   new FormControl('',),
      med_ingreso:   new FormControl('', Validators.required ),
      ran_patrimonio:   new FormControl('', ),
      med_patrimonio:  new FormControl('', Validators.required),
     
    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }


  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando
    this.enviarPadre.emit({ index: this.activeIndex + 1});

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
    this.enviarPadre.emit({ index: this.activeIndex - 1});
  }
}


