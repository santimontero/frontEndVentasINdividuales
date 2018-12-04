import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-cliente-domicilio',
  templateUrl: './cliente-domicilio.component.html',
  styleUrls: ['./cliente-domicilio.component.css']
})
export class ClienteDomicilioComponent implements OnInit {
 
  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  pais_ori: SelectItem[];
  nacional: SelectItem[];
  envio_core: SelectItem[];
  provincia: SelectItem[];
  ciudad: SelectItem[];
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
    this.pais_ori = [];
    this.pais_ori.push({ label: 'Ecuador', value: { id: 1, name: 'Ecuador', code: 'E' } });
    this.pais_ori.push({ label: 'Peru', value: { id: 2, name: 'Peru', code: 'P' } });

    this.nacional = [];
    this.nacional.push({ label: 'Ecuatoriano', value: { id: 1, name: 'Ecuatoriano', code: 'E' } });
    this.nacional.push({ label: 'Peruano', value: { id: 2, name: 'Peruano', code: 'P' } });

    this.envio_core = [];
    this.envio_core.push({ label: 'Domicilio', value: { id: 1, name: 'Domicilio', code: 'D' } });
    this.envio_core.push({ label: 'Trabajo', value: { id: 2, name: 'Trabajo', code: 'T' } });
   
    this.provincia = [];
    this.provincia.push({ label: 'Pichincha', value: { id: 1, name: 'Pichincha', code: 'P' } });
    this.provincia.push({ label: 'Guayas', value: { id: 2, name: 'Guayas', code: 'G' } });
  
  
  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      pais_origen:  new FormControl('', Validators.required),
      nacionalidad: new FormControl('', Validators.required),
      nomb_familiar:  new FormControl('', Validators.required),
      telef_familiar:  new FormControl('',),
      email:  new FormControl('', Validators.required),
      envio_cor:   new FormControl('', Validators.required),
      provincia_dom:   new FormControl('', Validators.required),
      ciudad_dom:   new FormControl('', Validators.required),
      calle_prin_dom:  new FormControl('', Validators.required),
      num_dom:  new FormControl('', Validators.required),
      trasv_dom: ['', ],
      refe_dom: ['', ],
      barrio_dom:  new FormControl('', Validators.required),
      tel_dom:   new FormControl('', Validators.required),
      cel_dom:   new FormControl('', Validators.required),
      hora_desde_dom: new FormControl('',),
      hora_hasta_dom: new FormControl('',),

      provincia_trab:   new FormControl('', Validators.required),
      ciudad_trab:   new FormControl('', Validators.required),
      calle_prin_trab:  new FormControl('', Validators.required),
      num_trab:   new FormControl('', Validators.required),
      trasv_trab: ['', ],
      barrio_trab:   new FormControl('', Validators.required),
      refe_trab:  new FormControl('', ),
      local_trab: new FormControl('',),
      piso_trab: new FormControl('',),
      tel_trab: new FormControl('',),
      ext_trab: new FormControl('',),

      fax: new FormControl('',),
      nom_empresa:   new FormControl('', Validators.required),
      hora_desde_trab: new FormControl('',),
      hora_hasta_trab: new FormControl('',),
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
