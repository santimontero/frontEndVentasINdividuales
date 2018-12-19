import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-datos-facturacion',
  templateUrl: './datos-facturacion.component.html',
  styleUrls: ['./datos-facturacion.component.css']
})
export class DatosFacturacionComponent implements OnInit {


  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
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

