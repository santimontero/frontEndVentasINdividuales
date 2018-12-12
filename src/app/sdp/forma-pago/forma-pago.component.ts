import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
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
    this.tipo_form_pago = [];

    this.tipo_form_pago.push({ label: 'DEB.AUT.CORRIENTE', value: 0 });
    this.tipo_form_pago.push({ label: 'DEB.AUT.AHORRO', value: 1 });
    this.tipo_form_pago.push({ label: 'DEB.AUT.TARJETA', value: 2 });

    this.bancos = [];
    this.bancos.push({ label: 'pichincha',value: 0 });
    this.bancos.push({ label: 'guayaquil',value: 1 });

    this.tipo_tarjeta = [];
    this.tipo_tarjeta.push({ label: 'visa', value:  1,  });
    this.tipo_tarjeta.push({ label: 'american', value:  2, });
   
    this.pais_emisor = [];
    this.pais_emisor.push({ label: 'ecuador', value:  1});
    this.pais_emisor.push({ label: 'peru', value:2 });
  
  
    this.mes = [];
    this.mes.push({ label: 'enero', value:  1});
    this.mes.push({ label: 'febrero', value:2 });
  
  
  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_form_pago:  new FormControl('', ),
      banco: new FormControl('',),
      numero:  new FormControl('', Validators.required ),
      tipo_tarjeta: new FormControl('',),
      pais_emisor: new FormControl('',),
      ano_caducidad: new FormControl('',),
      mes_caducidad: new FormControl('',),
      cvv: new FormControl('',),
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


