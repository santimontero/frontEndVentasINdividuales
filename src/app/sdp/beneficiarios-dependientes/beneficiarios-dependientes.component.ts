import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { totalmem } from 'os';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, Beneficiarios } from 'src/app/domain/emision';
import { gruposproducto } from 'src/app/domain/gruposproducto';
@Component({
  selector: 'app-beneficiarios-dependientes',
  templateUrl: './beneficiarios-dependientes.component.html',
  styleUrls: ['./beneficiarios-dependientes.component.css']
})
export class BeneficiariosDependientesComponent implements OnInit {

  @Output() public enviarPadre = new EventEmitter();
  @Input() activeIndex: any;
  @Input() emision: Emision;
  tipoId: SelectItem[];
  generos: SelectItem[];
  estadoCivil: SelectItem[];
  tipo_parentesco: SelectItem[];
  es: any;
  formulario: FormGroup;
  gruposconfig: gruposproducto[];
  grupos: any[];
  gruposelect: { id: number; name: string };
  table: any;
  part_total: number = 0;
  cols: { field: string; header: string; }[];
  constructor(private formBuilder: FormBuilder,
    public appComponent: AppComponent, private api: ApiRequestService) {
    this.gruposelect = { id: null, name: "" }
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

    this.cols = [
      { field: 'grupo_name', header: 'Grupo' },
      { field: 'paren_name', header: 'Parentesco' },
      { field: 'primer_nombre', header: 'Nombre' },
      { field: 'primer_apellido', header: 'Apellido' },
      { field: 'edad', header: 'Edad' },
      { field: 'participacion', header: 'Participación' }
    ];

  }

  ngOnInit() {
    this.part_total = 0;
    this.table = [];
    this.nuevofurmulario();

    if (this.emision.comercializacion.cfc_ingbenef != 'S') {
      this.siguiente();
    }

    this.grupos = [
      { label: 'BENEFICIARIOS', value: { id: 1, name: 'BENEFICIARIOS', code: 0 } },
    ];

    this.gruposconfig = [];
    this.api.get('api/configuraciones/gruposproducto?ramo=' + this.emision.cotizacion.pda_ramo + '&codigo=' + this.emision.cotizacion.pda_codigo_plan, 'beneficiarios-dependientes').subscribe(
      gruposProd => {
        for (let index = 0; index < gruposProd.length; index++) {
          var p = { label: 'DEPENDIENTES ' + gruposProd[index].gxp_descripcion, value: { id: (index + 2), name: 'DEPENDIENTES ' + gruposProd[index].gxp_descripcion, code: gruposProd[index].gxp_grupo } };
          this.grupos.push(p);
          var c = {
            prd_ramo: gruposProd[index].prd_ramo,
            prd_codigo: gruposProd[index].prd_codigo,
            gxp_grupo: gruposProd[index].gxp_grupo,
            gxp_necesario: gruposProd[index].gxp_necesario,
            gxp_descripcion: gruposProd[index].gxp_descripcion,
            gxp_pxp: gruposProd[index].gxp_pxp,
            gxp_tipo: gruposProd[index].gxp_tipo,
            gxp_factor: gruposProd[index].gxp_factor,
            gxp_tran: gruposProd[index].gxp_tran,
            gxp_sa: gruposProd[index].gxp_sa,
            gxp_bi: gruposProd[index].gxp_bi,
            gxp_sexo: gruposProd[index].gxp_sexo,
            gxp_num_per: gruposProd[index].gxp_num_per,
            gxp_edad_min: gruposProd[index].gxp_edad_min,
            gxp_edad_max: gruposProd[index].gxp_edad_max,
            gxp_bd_edad: gruposProd[index].gxp_bd_edad,
            gxp_edad_prom: gruposProd[index].gxp_edad_prom,
          }
          this.gruposconfig.push(c);
        }
      }
    )

    // this.grupos = [
    //   { label: 'BENEFICIARIOS', value: { id: 1, name: 'BENEFICIARIOS' } },
    //   { label: 'CONYUGUE', value: { id: 2, name: 'CONYUGUE' } },
    //   { label: 'HIJOS', value: { id: 3, name: 'HIJOS' } },
    //   { label: 'OTROS DEPENDIENTES', value: { id: 4, name: 'OTROS DEPENDIENTES' } },
    // ];

    this.tipoId = [];
    this.api.get('api/catalogos/tipoid', 'beneficiarios-dependientes').subscribe(
      tipoid => {
        for (let i = 0; i < tipoid.length; i++) {
          this.tipoId.push({ label: tipoid[i].cat_descripcion, value: tipoid[i].cat_id_catalogo });
        }
      }
    )

    this.generos = [];
    this.api.get('api/catalogos/genero', 'beneficiarios-dependientes').subscribe(
      gen => {
        for (let i = 0; i < gen.length; i++) {
          var p = { label: gen[i].cat_descripcion, value: { id: (i + 1), name: gen[i].cat_descripcion, code: gen[i].cat_id_catalogo } };
          this.generos.push(p);
        }
      }
    )

    this.estadoCivil = [];
    this.api.get('api/catalogos/estadocivil', 'beneficiarios-dependientes').subscribe(
      estciv => {
        for (let i = 0; i < estciv.length; i++) {
          var p = { label: estciv[i].cat_descripcion, value: { id: (i + 1), name: estciv[i].cat_descripcion, code: estciv[i].cat_id_catalogo } };
          this.estadoCivil.push(p);
        }
      }
    )

    this.tipo_parentesco = [];
    this.api.get('api/catalogos/parentescostitular', 'beneficiarios-dependientes').subscribe(
      parent => {
        for (let i = 0; i < parent.length; i++) {
          var p = { label: parent[i].cat_descripcion, value: { id: (i + 1), name: parent[i].cat_descripcion, code: parent[i].cat_id_catalogo } };
          this.tipo_parentesco.push(p);
        }
      }
    )
    if (this.emision.beneficiarios.length > 0) {
      this.appComponent.loader = true;
      setTimeout(() => {
        this.cargarfurmulario();
        this.appComponent.loader = false;
      }, 1000);
    }
  }
  nuevofurmulario() {
    this.gruposelect = { id: null, name: "" }
    return this.formulario = this.formBuilder.group({
      tipo_identificacion: ['', Validators.required],
      identificacion: new FormControl('', Validators.required),
      primer_nombre: new FormControl('', Validators.required),
      segundo_nombre: new FormControl(''),
      primer_apellido: new FormControl('', Validators.required),
      segundo_apellido: new FormControl(''),
      genero: ['', Validators.required],
      paren: ['', Validators.required],
      fecha_nacimiento: new FormControl('', Validators.required),
      edad: new FormControl(''),
      participacion: new FormControl(''),
    });


  }
  cargarfurmulario() {
    this.table = this.emision.beneficiarios;
    this.calcular_part();
  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  seleccionarGrupo(event) {

    if (event.value.name.includes('BENEFICIARI')) {

      if (+this.part_total > 100) {
        this.gruposelect = { id: null, name: "" }
        this.appComponent.message('error', 'Error', 'la participación no puede superar el 100%, modifique algun beneficiario');
      }

    } else {
      if (+this.part_total < 100) {
        this.gruposelect = { id: null, name: "" }
        this.appComponent.message('warn', 'Atención', 'la participación tiene que ser 100% antes de seleccionar otro grupo.');
      }
    }
  }


  public CalculateAge(): void {
    if (this.formulario.get('fecha_nacimiento').value) {
      var timeDiff = Math.abs(Date.now() - this.formulario.get('fecha_nacimiento').value);
      //Used Math.floor instead of Math.ceil
      //so 26 years and 140 days would be considered as 26, not 27.

      this.formulario.patchValue({ edad: Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) });

    }
  }
  delete(event) {
    var borrar = this.table.find(e => e.identificacion == event.identificacion && e.grupo_id == event.grupo_id);
    var index = this.table.indexOf(borrar);
    this.table.splice(index, 1);
    this.calcular_part();
  }
  edit(event) {

    this.gruposelect = { id: event.grupo_id, name: event.grupo_name }
    this.formulario = this.formBuilder.group({

      tipo_identificacion: new FormControl(event.tipo_identificacion, Validators.required),
      identificacion: new FormControl(event.identificacion, Validators.required),
      primer_nombre: new FormControl(event.primer_nombre, Validators.required),
      segundo_nombre: new FormControl(event.segundo_nombre),
      primer_apellido: new FormControl(event.primer_apellido, Validators.required),
      segundo_apellido: new FormControl(event.segundo_apellido),
      genero: new FormControl(event.genero, Validators.required),
      paren: new FormControl(event.paren, Validators.required),
      fecha_nacimiento: new FormControl(event.fecha_nacimiento, Validators.required),
      edad: new FormControl(event.edad),
      participacion: new FormControl(event.participacion),
    })
  }
  clone(event) {
    var existe = this.table.find(e => e.identificacion == event.identificacion && e.grupo_id == this.gruposelect.id);
    if (!existe && !this.gruposelect.name.includes('BENEFICIARI')) {
      const form = {

        tipo_identificacion: event.tipo_identificacion,
        identificacion: event.identificacion,
        primer_nombre: event.primer_nombre,
        segundo_nombre: event.segundo_nombre,
        primer_apellido: event.primer_apellido,
        segundo_apellido: event.segundo_apellido,
        genero: event.genero,
        paren: event.paren,
        paren_name: event.paren_name,
        fecha_nacimiento: event.fecha_nacimiento,
        edad: event.edad,
        participacion: null,
        grupo_id: this.gruposelect.id,
        grupo_name: this.gruposelect.name
      }

      this.table.push(form)
      this.nuevofurmulario();
    }
    else {

    }
  }
  guardar() {

    if (this.formulario.valid) {
      if(!this.table.find(e => e.identificacion == this.formulario.get('identificacion').value && e.grupo_id == this.gruposelect.id) && (+this.part_total + +this.formulario.get('participacion').value )> 100){
        this.appComponent.message('error','Error', 'la participación no puede superar el 100%');
      }else{

        this.appComponent.loader = true; //activar cargando

        const form = {

          tipo_identificacion: this.formulario.get('tipo_identificacion').value,
          identificacion: this.formulario. get('identificacion').value,
          primer_nombre: this.formulario.get('primer_nombre').value,
          segundo_nombre: this.formulario.get('segundo_nombre').value,
          primer_apellido: this.formulario.get('primer_apellido').value,
          segundo_apellido: this.formulario.get('segundo_apellido').value,
          genero: this.formulario.get('genero').value,
          paren: this.formulario.get('paren').value,
          paren_name: this.formulario.get('paren').value.name,
          fecha_nacimiento: this.formulario.get('fecha_nacimiento').value,
          edad: this.formulario.get('edad').value,
          participacion: this.formulario.get('participacion').value,
          grupo_id: this.gruposelect.id,
          grupo_name: this.gruposelect.name
        }
        var existe = this.table.find(e => e.identificacion == form.identificacion && e.grupo_id == form.grupo_id);
        if (existe) {
          this.table[this.table.indexOf(existe)] = form;
        } else {
          this.table.push(form)
        }
        this.calcular_part();
        this.nuevofurmulario();
        this.appComponent.loader = false; //desactivar cargando 
      }
    } else {
      Object.keys(this.formulario.controls).forEach(field => { // {1}
        const control = this.formulario.get(field);
        control.markAsDirty({ onlySelf: true });            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });

    }

  }
  siguiente() {

  
      this.appComponent.loader = true; //activar cargando
      this.emision.beneficiarios = new Array<Beneficiarios>();
      this.table.forEach(element => {
        this.emision.beneficiarios.push(element)
      });
   
      this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });

    this.appComponent.loader = true; //activar cargando
    this.emision.beneficiarios = new Array<Beneficiarios>();
    this.table.forEach(element => {
      this.emision.beneficiarios.push(element)
    });
    console.log(this.emision)
    this.enviarPadre.emit({ index: this.activeIndex + 1, emision: this.emision });

    this.appComponent.loader = false; //desactivar cargando 

  }

  calcular_part() {
    this.part_total = 0;
    this.table.forEach(element => {
      this.part_total = +this.part_total + +element.participacion;
    });

  }
  anterior() {
    this.enviarPadre.emit({ index: this.activeIndex - 1, emision: this.emision });
  }
}
