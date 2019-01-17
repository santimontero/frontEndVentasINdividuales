import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, Cliente } from 'src/app/domain/emision';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  tipoId: SelectItem[];
  generos: SelectItem[];
  estadoCivil: SelectItem[];
  es: any;
  formulario: FormGroup;
  dec_tit:boolean=false;
  dec_ben:boolean=false;
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

console.log(this.emision.comercializacion)
    this.tipoId = [];
    this.api.get('api/catalogos/tipoid', 'cliente').subscribe(
      tipoid => {
        for (let i = 0; i < tipoid.length; i++) {
          this.tipoId.push({ label: tipoid[i].cat_descripcion, value: tipoid[i].cat_id_catalogo });
        }

      }

    )

    this.generos = [];
    this.api.get('api/catalogos/genero', 'cliente').subscribe(
      genre => {
        for (let i = 0; i < genre.length; i++) {
          var p = { label: genre[i].cat_descripcion, value: genre[i].cat_id_catalogo };
          this.generos.push(p);
        }
      }
    )

    this.estadoCivil = [];
    this.api.get('api/catalogos/estadocivil', 'cliente').subscribe(
      estciv => {
        for (let i = 0; i < estciv.length; i++) {
          var p = { label: estciv[i].cat_descripcion, value: estciv[i].cat_id_catalogo };
          this.estadoCivil.push(p);
        }
      }
    )

    if (this.emision.cliente != null) {
      this.appComponent.loader = true;
      setTimeout(() => {
        this.cargarfurmulario();
        this.appComponent.loader = false;
      }, 1000);
    }

  }

  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: ['', Validators.required],
      identificacion: new FormControl('', Validators.required),
      primer_nombre: new FormControl('', Validators.required),
      segundo_nombre: new FormControl(''),
      primer_apellido: new FormControl('', Validators.required),
      segundo_apellido: new FormControl(''),
      genero: ['', Validators.required],
      estado_civil: ['', Validators.required],
      fecha_nacimiento: new FormControl('', Validators.required),
      edad: new FormControl(''),
      estado_migratorio: new FormControl(''),
      Fecha_Expedicion_Pasp: new FormControl(''),
      Fecha_Ingreso_Pais: new FormControl(''),
      Fecha_Caducidad_Pasp: new FormControl(''),
      dec_tit: new FormControl(''),
      dec_ben: new FormControl(''),
      descla_salud_tit: new FormControl('DECLARO NO PADECER NINGUN TIPO DE ENFERMEDAD'),
      descla_salud_bene: new FormControl('DECLARO NO PADECER NINGUN TIPO DE ENFERMEDAD'),
    });


  }
  cargarfurmulario() {
    this.formulario = this.formBuilder.group({
      tipo_identificacion: new FormControl(this.emision.cliente.tipo_identificacion, Validators.required),
      identificacion: new FormControl(this.emision.cliente.identificacion, Validators.required),
      primer_nombre: new FormControl(this.emision.cliente.primer_nombre, Validators.required),
      segundo_nombre: new FormControl(this.emision.cliente.segundo_nombre),
      primer_apellido: new FormControl(this.emision.cliente.primer_apellido, Validators.required),
      segundo_apellido: new FormControl(this.emision.cliente.segundo_apellido),
      genero: [this.emision.cliente.genero, Validators.required],
      estado_civil: [this.emision.cliente.estado_civil, Validators.required],
      fecha_nacimiento: new FormControl(this.emision.cliente.fecha_nacimiento, Validators.required),
      edad: new FormControl(this.emision.cliente.edad),

      estado_migratorio: new FormControl(this.emision.cliente.estado_migratorio),
      Fecha_Expedicion_Pasp: new FormControl(this.emision.cliente.Fecha_Expedicion_Pasp),
      Fecha_Ingreso_Pais: new FormControl(this.emision.cliente.Fecha_Ingreso_Pais),
      Fecha_Caducidad_Pasp: new FormControl(this.emision.cliente.Fecha_Caducidad_Pasp),

      descla_salud_tit: new FormControl(this.emision.cliente.descla_salud_tit),
      descla_salud_bene: new FormControl(this.emision.cliente.descla_salud_bene),

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
      var edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      console.log(this.emision.cotizacion)
      if (edad >= this.emision.cotizacion.prd_edad_max || edad <= this.emision.cotizacion.prd_edad_min) {
        this.formulario.patchValue({ fecha_nacimiento: '' });
        this.formulario.patchValue({ edad: '' });
        this.appComponent.message('warn', 'Atención', 'La fecha e nacimiento ingreasada no esta permitida para este producto.');

      } else {
        this.formulario.patchValue({ edad: edad });
      }



    }
  }

  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando


      var cli = this.formulario.getRawValue();

      this.api.get('api/cliente/validaidentificacion?tipoId=' + cli.tipo_identificacion + '&identificacion=' + cli.identificacion, 'cotizacion').subscribe(
        valCe => {


          if (valCe.resultado == "OK") {

            this.api.post('api/cliente/ofac', this.datosEnvioOFAC(), 'cotizacion').subscribe(Data => {
              console.log(Data)
              if (Data.resultado == "OK") {
                this.api.post('api/cliente/validarestriccion', this.datosEnvioRESTVENTA(), 'cotizacion').subscribe(Data2 => {
                  if (Data2.ai_num_error == 0) {
                    this.emision.cliente = new Cliente();
                    this.emision.cliente = cli

                    this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });
                    this.appComponent.loader = false;

                  } else {
                    this.appComponent.loader = false;
                    this.appComponent.message('warn', 'Restriccion de Ventas', Data2.avc_desc_error);
                  }
                });
              } else {
                this.appComponent.loader = false;
                this.appComponent.message('warn', 'Validación Listas OFAC', Data.resultado);
              }
            });
          } else {
            this.appComponent.loader = false;
            this.appComponent.message('warn', 'Validación Identificación', valCe.resultado);

          }
        }
      )

      // OFAC


      // RESTRICCION DE VENTAS





      //desactivar cargando 
    } else {
      Object.keys(this.formulario.controls).forEach(field => { // {1}
        const control = this.formulario.get(field);
        control.markAsDirty({ onlySelf: true });            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });

    }
  }
  datosEnvioOFAC() {

    const ofac = {
      tipoCliente: 'N',
      tipoId: this.formulario.get('tipo_identificacion').value,
      cedula: this.formulario.get('identificacion').value,
      primerNombre: this.formulario.get('primer_nombre').value,
      segundoNombre: this.formulario.get('segundo_nombre').value,
      primerApellido: this.formulario.get('primer_apellido').value,
      segundoApellido: this.formulario.get('segundo_apellido').value,
      identificacion: this.api.getInfoUsuario().identificacion,
      codigoUsuario: this.api.getInfoUsuario().displayName,
    };

    return ofac;


  }
  datosEnvioRESTVENTA() {

    const data = {
      tipoId: this.formulario.get('tipo_identificacion').value,
      num_id: this.formulario.get('identificacion').value,
      ramo: this.emision.cotizacion.pda_ramo,
      cod_producto: this.emision.cotizacion.pda_codigo_plan,
      cod_prod_comercializado: this.emision.cotizacion.pda_codigo_conf_prd,
      am_sa: this.emision.cotizacion.suma_aseg,
    };

    return data;
  }
  anterior() {
    this.enviarPadre.emit({ index: this.activeIndex - 1, emision: this.emision });
  }
  ChangeTit(event){
    if(event.checked){
    this.formulario.patchValue({ descla_salud_tit: "" });
    }else{
      this.formulario.patchValue({ descla_salud_tit: "DECLARO NO PADECER NINGUN TIPO DE ENFERMEDAD" });
    }
  }
  ChangeBen(event){
    if(event.checked){
      this.formulario.patchValue({ descla_salud_bene: "" });
      }else{
        this.formulario.patchValue({ descla_salud_bene: "DECLARO NO PADECER NINGUN TIPO DE ENFERMEDAD" });
     }
  }
}
