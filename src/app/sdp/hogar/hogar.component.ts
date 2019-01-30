import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, Hogar } from 'src/app/domain/emision';

@Component({
  selector: 'app-hogar',
  templateUrl: './hogar.component.html',
  styleUrls: ['./hogar.component.css']
})
export class HogarComponent implements OnInit {


  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  
  provincia_dom: SelectItem[];
  ciudad_dom: SelectItem[];
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
       this.provincia_dom = [];
    this.api.get('api/catalogos/provincias', 'direccion').subscribe(
      prov => {
        for (let i = 0; i < prov.length; i++) {
          var p = { label: prov[i].cat_descripcion, value: prov[i].cat_id_catalogo };
          this.provincia_dom.push(p);
        }
      }
    )

    if (this.emision.hogar != null) {
      this.appComponent.loader = true; 
  
      this.ciudad_dom = [];
      this.api.get('api/catalogos/ciudades?codProv=' + this.emision.hogar.provincia, 'direccion').subscribe(
        ciud => {
          for (let i = 0; i < ciud.length; i++) {
            var p = { label: ciud[i].cat_descripcion, value: ciud[i].cat_id_catalogo };
            this.ciudad_dom.push(p);
          }
          setTimeout(() => { 
            this.cargarfurmulario();
            this.appComponent.loader = false; 
        }, 100);
        }
      )
    }else{
      this.ciudad_dom = [];
      this.api.get('api/catalogos/ciudades?codProv=' + this.emision.clienteDomicilio.provincia_dom, 'direccion').subscribe(
        ciud => {
          for (let i = 0; i < ciud.length; i++) {
            var p = { label: ciud[i].cat_descripcion, value: ciud[i].cat_id_catalogo };
            this.ciudad_dom.push(p);
          }
          setTimeout(() => { 
            this.nuevofurmulario2();
            this.appComponent.loader = false; 
        }, 100);
        }
      )
    }
  
    
  }
  nuevofurmulario() {
  
    return this.formulario = this.formBuilder.group({
   
      provincia: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      calle_prin: new FormControl('', Validators.required),
      num: new FormControl('', Validators.required),
      trasv: ['',],
      refe: ['',],
      barrio: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      piso: new FormControl('', ),
    });


  }
  nuevofurmulario2() {
  
    return this.formulario = this.formBuilder.group({
   
      provincia: new FormControl(this.emision.clienteDomicilio.provincia_dom, Validators.required),
      ciudad: new FormControl(this.emision.clienteDomicilio.ciudad_dom, Validators.required),
      calle_prin: new FormControl(this.emision.clienteDomicilio.calle_prin_dom, Validators.required),
      num: new FormControl(this.emision.clienteDomicilio.num_dom, Validators.required),
      trasv: [this.emision.clienteDomicilio.trasv_dom,],
      refe: [this.emision.clienteDomicilio.refe_dom,],
      barrio: new FormControl(this.emision.clienteDomicilio.barrio_dom, Validators.required),
      tel: new FormControl(this.emision.clienteDomicilio.tel_dom, Validators.required),
      piso: new FormControl(this.emision.clienteDomicilio.piso_dom, ),
    });


  }
  cargarfurmulario() {
    this.formulario = this.formBuilder.group({
      provincia: new FormControl(this.emision.hogar.provincia, Validators.required),
      ciudad: new FormControl(this.emision.hogar.ciudad, Validators.required),
      calle_prin: new FormControl(this.emision.hogar.calle_prin, Validators.required),
      num: new FormControl(this.emision.hogar.num, Validators.required),
      trasv: [this.emision.hogar.trasv,],
      refe: [this.emision.hogar.refe,],
      barrio: new FormControl(this.emision.hogar.barrio, Validators.required),
      tel: new FormControl(this.emision.hogar.tel, Validators.required),
      piso: new FormControl(this.emision.hogar.piso,)
    });

  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  public CalculateAge(): void {
    if (this.formulario.get('fecha_nacimiento').value) {
      var timeDiff = Math.abs(Date.now() - this.formulario.get('fecha_nacimiento').value);
      //Used Math.floor instead of Math.ceil
      //so 26 years and 140 days would be considered as 26, not 27.

      this.formulario.patchValue({ edad: Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) });

    }
  }

  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando
      this.emision.hogar = new Hogar();
      this.emision.hogar = this.formulario.getRawValue(); // {name: '', description: ''}

      this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });

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

  seleccionarProvDom(event) {
    this.ciudad_dom = [];
    this.api.get('api/catalogos/ciudades?codProv=' + event.value, 'direccion').subscribe(
      ciud => {
        for (let i = 0; i < ciud.length; i++) {
          var p = { label: ciud[i].cat_descripcion, value: ciud[i].cat_id_catalogo };
          this.ciudad_dom.push(p);
        }
      }
    )
  }


}
