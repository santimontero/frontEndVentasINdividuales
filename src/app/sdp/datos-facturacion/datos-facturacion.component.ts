import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, Factura } from 'src/app/domain/emision';

@Component({
  selector: 'app-datos-facturacion',
  templateUrl: './datos-facturacion.component.html',
  styleUrls: ['./datos-facturacion.component.css']
})
export class DatosFacturacionComponent implements OnInit {


  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  tipoId: SelectItem[];

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
    this.tipoId = [];
    this.appComponent.loader = true;
    this.api.get('api/catalogos/tipoid', 'cliente').subscribe(
      tipoid => {
        for (let i = 0; i < tipoid.length; i++) {
          this.tipoId.push({ label: tipoid[i].cat_descripcion, value: tipoid[i].cat_id_catalogo });
        }

        if (this.emision.factura != null) {

          this.cargarfurmulario();
          this.appComponent.loader = false;

        } else {

          this.nuevofurmulario2();
          console.log(this.formulario)
          this.appComponent.loader = false;

        }
      }
    )

  }
  cargarfurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: new FormControl(this.emision.factura.tipo_identificacion, Validators.required),
      identificacion: new FormControl(this.emision.factura.identificacion, Validators.required),
      email: new FormControl(this.emision.factura.email, Validators.required),
      telefono: new FormControl(this.emision.factura.telefono, Validators.required),
      nombre: new FormControl(this.emision.factura.nombre, Validators.required),
      direccion: new FormControl(this.emision.factura.direccion, Validators.required),

    });


  }

  nuevofurmulario2() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: new FormControl(this.emision.cliente.tipo_identificacion, Validators.required),
      identificacion: new FormControl(this.emision.cliente.identificacion, Validators.required),
      email: new FormControl(this.emision.clienteDomicilio.email, Validators.required),
      telefono: new FormControl(this.emision.clienteDomicilio.tel_dom, Validators.required),
      nombre: new FormControl(this.emision.cliente.primer_nombre + ' ' + this.emision.cliente.primer_apellido, Validators.required),
      direccion: new FormControl(this.emision.clienteDomicilio.calle_prin_dom + ' ' + this.emision.clienteDomicilio.num_dom + ' ' + this.emision.clienteDomicilio.trasv_dom, Validators.required),

    });


  }
  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: new FormControl('', Validators.required),
      identificacion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),

    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }



  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando

      var cli = this.formulario.getRawValue();

      this.api.get('api/cliente/validaidentificacion?tipoId=' + cli.tipo_identificacion + '&identificacion=' + cli.identificacion, 'cotizacion').subscribe(
        valCe => {


          if (valCe.resultado == "OK") {

            this.emision.factura = new Factura();
            this.emision.factura = cli // {name: '', description: ''}

            this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });
          } else {
            this.appComponent.message('warn', 'Validación Identificación', valCe.resultado);

          }
        }
      )
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
    if (this.emision.comercializacion.cfc_ingbenef != 'S' && (this.emision.cotizacion.pda_ramo != "04"&&this.emision.cotizacion.pda_ramo != "34" ) )  {
      this.enviarPadre.emit({ index: this.activeIndex - 2, emision: this.emision });
    }
    else {
      this.enviarPadre.emit({ index: this.activeIndex - 1, emision: this.emision });
    }
  }
}

