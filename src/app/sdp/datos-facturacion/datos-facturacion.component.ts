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
    this.api.get('api/catalogos/tipoid', 'cliente').subscribe(
      tipoid => {
        for (let i = 0; i < tipoid.length; i++) {
          var p = { label: tipoid[i].cat_descripcion, value: { id: (i + 1), name: tipoid[i].cat_descripcion, code: tipoid[i].cat_id_catalogo } };
          this.tipoId.push(p);
        }
      }
    )
    if (this.emision.factura != null) {
      this.appComponent.loader = true; 
    setTimeout(() => { 
        this.cargarfurmulario();
        this.appComponent.loader = false; 
    }, 1000);
    }
  }
  cargarfurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: new FormControl(this.emision.factura.tipo_identificacion,Validators.required),
      identificacion: new FormControl(this.emision.factura.identificacion, Validators.required),
      email: new FormControl(this.emision.factura.email, Validators.required),
      telefono: new FormControl(this.emision.factura.telefono, Validators.required),
      nombre: new FormControl(this.emision.factura.nombre, Validators.required),
      direccion: new FormControl(this.emision.factura.direccion,Validators.required),
 
    });


  }

  nuevofurmulario() {
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: new FormControl('',Validators.required),
      identificacion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('',Validators.required),
 
    });


  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

 

  siguiente() {

    if (this.formulario.valid) {
      this.appComponent.loader = true; //activar cargando
      this.emision.factura = new Factura();
      this.emision.factura = this.formulario.getRawValue(); // {name: '', description: ''}

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
}

