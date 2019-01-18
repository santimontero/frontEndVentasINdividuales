import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, ClienteDomicilio } from 'src/app/domain/emision';
@Component({
  selector: 'app-cliente-domicilio',
  templateUrl: './cliente-domicilio.component.html',
  styleUrls: ['./cliente-domicilio.component.css']
})
export class ClienteDomicilioComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  pais_ori: SelectItem[];
  nacional: SelectItem[];
  envio_core: SelectItem[];
  provincia: SelectItem[];
  ciudad_dom: SelectItem[];
  ciudad_trab: SelectItem[];
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
    this.pais_ori = [];
    this.api.get('api/catalogos/paises', 'direccion').subscribe(
      paises => {
        for (let i = 0; i < paises.length; i++) {
          var p = { label: paises[i].cat_descripcion, value: paises[i].cat_id_catalogo };
          this.pais_ori.push(p);
        }
      }
    )

    this.nacional = [];
    this.api.get('api/catalogos/nacionalidades', 'direccion').subscribe(
      nac => {
        for (let i = 0; i < nac.length; i++) {
          var p = { label: nac[i].cat_descripcion, value: nac[i].cat_id_catalogo };
          this.nacional.push(p);
        }
      }
    )

    this.envio_core = [];
    this.envio_core.push({ label: 'Domicilio', value: { id: 1, name: 'Domicilio', code: 'C' } });
    this.envio_core.push({ label: 'Trabajo', value: { id: 2, name: 'Oficina', code: 'O' } });

    this.provincia = [];
    this.api.get('api/catalogos/provincias', 'direccion').subscribe(
      prov => {
        for (let i = 0; i < prov.length; i++) {
          var p = { label: prov[i].cat_descripcion, value: prov[i].cat_id_catalogo };
          this.provincia.push(p);
        }
      }
    )

    if (this.emision.clienteDomicilio != null) {


      this.ciudad_trab = [];
      this.api.get('api/catalogos/ciudades?codProv=' + this.emision.clienteDomicilio.provincia_trab, 'direccion').subscribe(
        ciud => {
          for (let i = 0; i < ciud.length; i++) {
            var p = { label: ciud[i].cat_descripcion, value: ciud[i].cat_id_catalogo };
            this.ciudad_trab.push(p);
          }
          this.appComponent.loader = true; 
          setTimeout(() => { 
              this.cargarfurmulario();
              this.appComponent.loader = false; 
          }, 100);
        }
      )

      this.ciudad_dom = [];
      this.api.get('api/catalogos/ciudades?codProv=' + this.emision.clienteDomicilio.provincia_dom, 'direccion').subscribe(
        ciud => {
          for (let i = 0; i < ciud.length; i++) {
            var p = { label: ciud[i].cat_descripcion, value: ciud[i].cat_id_catalogo };
            this.ciudad_dom.push(p);
          }

        }
      )
    }
 
  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      pais_origen: new FormControl('', Validators.required),
      nacionalidad: new FormControl('', Validators.required),
      nomb_familiar: new FormControl('', Validators.required),
      telef_familiar: new FormControl(''),
      email: new FormControl('', Validators.required),
      envio_cor: new FormControl('', Validators.required),
      provincia_dom: new FormControl('', Validators.required),
      ciudad_dom: new FormControl('', Validators.required),
      calle_prin_dom: new FormControl('', Validators.required),
      num_dom: new FormControl('', Validators.required),
      trasv_dom: ['',],
      refe_dom: ['',],
      barrio_dom: new FormControl('', Validators.required),
      tel_dom: new FormControl('', Validators.required),
      cel_dom: new FormControl('', Validators.required),
      hora_desde_dom: new FormControl(''),
      hora_hasta_dom: new FormControl(''),

      provincia_trab: new FormControl('', Validators.required),
      ciudad_trab: new FormControl('', Validators.required),
      calle_prin_trab: new FormControl('', Validators.required),
      num_trab: new FormControl('', Validators.required),
      trasv_trab: ['',],
      barrio_trab: new FormControl('', Validators.required),
      refe_trab: new FormControl(''),
      local_trab: new FormControl(''),
      piso_trab: new FormControl(''),
      tel_trab: new FormControl('', Validators.required),
      ext_trab: new FormControl(''),

      nom_empresa: new FormControl('', Validators.required),
      hora_desde_trab: new FormControl(''),
      hora_hasta_trab: new FormControl(''),
    });


  }
  cargarfurmulario() {
    this.formulario = this.formBuilder.group({
      pais_origen: new FormControl(this.emision.clienteDomicilio.pais_origen, Validators.required),
      nacionalidad: new FormControl(this.emision.clienteDomicilio.nacionalidad, Validators.required),
      nomb_familiar: new FormControl(this.emision.clienteDomicilio.nomb_familiar, Validators.required),
      telef_familiar: new FormControl(this.emision.clienteDomicilio.telef_familiar),
      email: new FormControl(this.emision.clienteDomicilio.email, Validators.required),
      envio_cor: new FormControl(this.emision.clienteDomicilio.envio_cor, Validators.required),
      provincia_dom: new FormControl(this.emision.clienteDomicilio.provincia_dom, Validators.required),
      ciudad_dom: new FormControl(this.emision.clienteDomicilio.ciudad_dom, Validators.required),
      calle_prin_dom: new FormControl(this.emision.clienteDomicilio.calle_prin_dom, Validators.required),
      num_dom: new FormControl(this.emision.clienteDomicilio.num_dom, Validators.required),
      trasv_dom: [this.emision.clienteDomicilio.trasv_dom,],
      refe_dom: [this.emision.clienteDomicilio.refe_dom,],
      barrio_dom: new FormControl(this.emision.clienteDomicilio.barrio_dom, Validators.required),
      tel_dom: new FormControl(this.emision.clienteDomicilio.tel_dom, Validators.required),
      cel_dom: new FormControl(this.emision.clienteDomicilio.cel_dom, Validators.required),
      hora_desde_dom: new FormControl(this.emision.clienteDomicilio.hora_desde_dom),
      hora_hasta_dom: new FormControl(this.emision.clienteDomicilio.hora_hasta_dom),

      provincia_trab: new FormControl(this.emision.clienteDomicilio.provincia_trab, Validators.required),
      ciudad_trab: new FormControl(this.emision.clienteDomicilio.ciudad_trab, Validators.required),
      calle_prin_trab: new FormControl(this.emision.clienteDomicilio.calle_prin_trab, Validators.required),
      num_trab: new FormControl(this.emision.clienteDomicilio.num_trab, Validators.required),
      trasv_trab: [this.emision.clienteDomicilio.trasv_trab,],
      barrio_trab: new FormControl(this.emision.clienteDomicilio.barrio_trab, Validators.required),
      refe_trab: new FormControl(this.emision.clienteDomicilio.refe_trab),
      local_trab: new FormControl(this.emision.clienteDomicilio.local_trab),
      piso_trab: new FormControl(this.emision.clienteDomicilio.piso_trab),
      tel_trab: new FormControl(this.emision.clienteDomicilio.tel_trab, Validators.required),
      ext_trab: new FormControl(this.emision.clienteDomicilio.ext_trab),

         nom_empresa: new FormControl(this.emision.clienteDomicilio.nom_empresa, Validators.required),
      hora_desde_trab: new FormControl(this.emision.clienteDomicilio.hora_desde_trab),
      hora_hasta_trab: new FormControl(this.emision.clienteDomicilio.hora_hasta_trab),
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
      this.emision.clienteDomicilio = new ClienteDomicilio();
      this.emision.clienteDomicilio = this.formulario.getRawValue(); // {name: '', description: ''}

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

  seleccionarProvTrab(event) {
    this.ciudad_trab = [];
    this.api.get('api/catalogos/ciudades?codProv=' + event.value, 'direccion').subscribe(
      ciud => {
        for (let i = 0; i < ciud.length; i++) {
          var p = { label: ciud[i].cat_descripcion, value: ciud[i].cat_id_catalogo };
          this.ciudad_trab.push(p);
        }
      }
    )
  }
}
