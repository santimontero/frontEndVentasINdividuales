import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  tipoId: SelectItem[];
  generos: SelectItem[];
  estadoCivil: SelectItem[];
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
    this.tipoId = [];
    this.tipoId.push({ label: 'Cedula', value: { id: 1, name: 'Cedula', code: 'C' } });
    this.tipoId.push({ label: 'Pasaporte', value: { id: 2, name: 'Pasaporte', code: 'R' } });

    this.generos = [];
    this.generos.push({ label: 'Masculino', value: { id: 1, name: 'Masculino', code: 'M' } });
    this.generos.push({ label: 'Femenino', value: { id: 2, name: 'Femenino', code: 'F' } });

    this.estadoCivil = [];
    this.estadoCivil.push({ label: 'Soltero', value: { id: 1, name: 'Soltero', code: 'S' } });
    this.estadoCivil.push({ label: 'Casado', value: { id: 2, name: 'Casado', code: 'C' } });
    this.estadoCivil.push({ label: 'Divorciado', value: { id: 2, name: 'Divorciado', code: 'D' } });
  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: ['',],
      identificacion: new FormControl('', Validators.required),
      primer_nombre:  new FormControl('', Validators.required),
      segundo_nombre:  new FormControl('',),
      primer_apellido:  new FormControl('', Validators.required),
      segundo_apellido:  new FormControl('',),
      genero: ['', ],
      estado_civil: ['', ],
      fecha_nacimiento:  new FormControl('', Validators.required),
      edad: new FormControl('',),
    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  public CalculateAge(): void
  {
      if(this.formulario.get('fecha_nacimiento').value){
         var timeDiff = Math.abs(Date.now() - this.formulario.get('fecha_nacimiento').value);
         //Used Math.floor instead of Math.ceil
         //so 26 years and 140 days would be considered as 26, not 27.

         this.formulario.patchValue({edad: Math.floor((timeDiff / (1000 * 3600 * 24))/365)});
  
     }
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
