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

      this.emision.cliente = new Cliente();
      this.emision.cliente = this.formulario.getRawValue(); // {name: '', description: ''}

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
