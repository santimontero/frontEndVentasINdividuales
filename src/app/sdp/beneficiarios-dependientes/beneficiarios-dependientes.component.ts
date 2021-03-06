import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AppComponent } from 'src/app/app.component';
import { totalmem } from 'os';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Emision, Beneficiarios, confGrupo } from 'src/app/domain/emision';
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
  tipo_parentesco_final: SelectItem[];
  es: any;
  formulario: FormGroup;
  gruposconfig: gruposproducto[];
  grupos: any[];
  // gruposelect: { id: number; name: string; code: number };
  table: any[];
  part_total: number = 0;
  cols: { field: string; header: string; }[];
  // confGrupo: confGrupo;
  index: any;
  mostrarPart: boolean = false;
  constructor(private formBuilder: FormBuilder,
    public appComponent: AppComponent, private api: ApiRequestService) {
    // this.gruposelect = { id: null, name: "", code: null }
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
    this.gruposconfig = [];
    this.index = 0;


    // this.api.get('api/configuraciones/gruposproducto?ramo=01' + '&codigo=01782', 'beneficiarios-dependientes').subscribe(

    this.api.get('api/configuraciones/gruposproducto?ramo=' + this.emision.cotizacion.pda_ramo + '&codigo=' + this.emision.cotizacion.pda_codigo_plan, 'beneficiarios-dependientes').subscribe(
      gruposProd => {
        this.grupos = [];
        for (let index = 0; index < gruposProd.length; index++) {
          var p = { label: gruposProd[index].gxp_descripcion.replace(/~+$/, ''), value: { id: (index + 1), name: gruposProd[index].gxp_descripcion.replace(/~+$/, ''), code: gruposProd[index].gxp_grupo } };
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
          if (c.gxp_grupo != 1) { this.gruposconfig.push(c); }



        }

        // this.gruposelect= this.grupos[0].value
      }
    )

    console.log(this.gruposconfig)


    this.tipoId = [];
    this.tipoId.push({ label: "NO TIENE", value: "04" });

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
    this.tipo_parentesco_final = [];
    this.api.get('api/catalogos/parentescostitular', 'beneficiarios-dependientes').subscribe(
      parent => {
        for (let i = 0; i < parent.length; i++) {
          var p = { label: parent[i].cat_descripcion, value: { id: (i + 1), name: parent[i].cat_descripcion, code: parent[i].cat_id_catalogo } };
          this.tipo_parentesco.push(p);
          this.tipo_parentesco_final.push(p);
        }

      }
    )
    if (this.emision.beneficiarios != null) {
      this.appComponent.loader = true;
      setTimeout(() => {
        this.cargarfurmulario();
        this.appComponent.loader = false;
      }, 1000);
    }
  }
  nuevofurmulario() {
    // this.gruposelect = { id: null, name: "", code: null }
    this.formulario = this.formBuilder.group({
      id: null,
      tipo_identificacion: ['', Validators.required],
      identificacion: new FormControl(''),
      primer_nombre: new FormControl('', Validators.required),
      segundo_nombre: new FormControl(''),
      primer_apellido: new FormControl('', Validators.required),
      segundo_apellido: new FormControl(''),
      genero: ['', Validators.required],
      paren: ['', Validators.required],
      fecha_nacimiento: new FormControl(''),
      edad: new FormControl('', Validators.required),
      participacion: new FormControl(''),
      grupo: new FormControl('', Validators.required),
    });
    this.mostrarPart = false;

  }
  cargarfurmulario() {
    this.table = this.emision.beneficiarios;
    this.calcular_part();
  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }

  seleccionarGrupo(event) {
    console.log(event);
    var actual = event.itemValue
    if (event.value.find(a => a.code == 1)) {
      this.mostrarPart = true;
    } else {
      this.mostrarPart = false;
    }
    if (this.gruposconfig.find(a => a.gxp_grupo == actual.code)) {
      this.table.forEach(p => {
        if (this.gruposconfig.find(a => a.gxp_grupo == actual.code).gxp_num_per <= p.grupo.filter(a => a.code == actual.code).length) {
          this.appComponent.message('warn', 'Atención', 'No puede superar el maximo número de persona configurado');
          var index = this.formulario.get('grupo').value.indexOf(actual);
          this.formulario.get('grupo').value.splice(index, 1);
          actual = null;
        }
      })

      if (actual.name.includes('CONYU')) {
        if (!(this.formulario.get('paren').value.code == "14" || this.formulario.get('paren').value.code == "21")) {
          this.appComponent.message('error', 'Error', 'El parentezco no esta correcto para este grupo');
          var index = this.formulario.get('grupo').value.indexOf(actual);
          this.formulario.get('grupo').value.splice(index, 1);

          return;
        }

      } else if (actual.name.includes('HIJO')) {

        if (!(this.formulario.get('paren').value.code == "22" || this.formulario.get('paren').value.code == "19")) {

          this.appComponent.message('error', 'Error', 'El parentezco no esta correcto para este grupo');
          var index = this.formulario.get('grupo').value.indexOf(actual);
          this.formulario.get('grupo').value.splice(index, 1);
          return;
        }
      }
    } else
      if (+this.part_total == 100 && actual.code == 1) {

        this.appComponent.message('info', 'Información', 'la participación no puede superar el 100% .');
        var index = this.formulario.get('grupo').value.indexOf(actual);
        this.formulario.get('grupo').value.splice(index, 1);


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
    var borrar = this.table.find(e => e.id == event.id);
    var index = this.table.indexOf(borrar);
    this.table.splice(index, 1);
    this.calcular_part();
  }
  edit(event) {
    console.log(event);
    //this.gruposelect = { id: event.grupo_id, name: event.grupo_name, code: event.grupo_id }
    this.formulario = this.formBuilder.group({
      id: new FormControl(event.id),
      tipo_identificacion: new FormControl(event.tipo_identificacion, Validators.required),
      identificacion: new FormControl(event.identificacion),
      primer_nombre: new FormControl(event.primer_nombre, Validators.required),
      segundo_nombre: new FormControl(event.segundo_nombre),
      primer_apellido: new FormControl(event.primer_apellido, Validators.required),
      segundo_apellido: new FormControl(event.segundo_apellido),
      genero: new FormControl(event.genero, Validators.required),
      paren: new FormControl(event.paren, Validators.required),
      fecha_nacimiento: new FormControl(event.fecha_nacimiento),
      edad: new FormControl(event.edad, Validators.required),
      participacion: new FormControl(event.participacion),
      grupo: new FormControl(event.grupo, Validators.required),
    })

    if (event.grupo.find(a => a.code == 1)) {
      this.mostrarPart = true;
    } else {
      this.mostrarPart = false;
    }
  }


  guardar() {

    if (this.formulario.valid) {
      var cont = 0;
      if ((+this.part_total + +this.formulario.get('participacion').value) > 100 && this.formulario.get('id').value == null) {
        this.appComponent.message('error', 'Error', 'la participación no puede superar el 100%');
        cont = cont + 1;
      }
      this.formulario.get('grupo').value.forEach(element => {
        if (element.code != 1) {
          this.table.forEach(p => {
            if (this.gruposconfig.find(a => a.gxp_grupo == element.code).gxp_num_per <= p.grupo.filter(a => a.code == element.code).length) {
              this.appComponent.message('warn', 'Atención', 'No puede superar el maximo número de persona configurado');
              cont = cont + 1;
            } else if ((this.gruposconfig.find(a => a.gxp_grupo == element.code).gxp_edad_min > this.formulario.get('edad').value) || (this.formulario.get('edad').value > this.gruposconfig.find(a => a.gxp_grupo == element.code).gxp_edad_max)) {
              this.appComponent.message('warn', 'Atención', 'La edad ingresada no esta permitida para este grupo.');
              cont = cont + 1;
            }
          })


        }else{
          
        }
      });

      if (cont == 0) {

        var cli = this.formulario.getRawValue();
        if (cli.tipo_identificacion == "04") {
          this.guardadoFinal();
        } else {
          this.api.get('api/cliente/validaidentificacion?tipoId=' + cli.tipo_identificacion + '&identificacion=' + cli.identificacion, 'cotizacion').subscribe(
            valCe => {
              if (valCe.resultado == "OK") {
                this.guardadoFinal();
              } else {
                this.appComponent.message('warn', 'Validación Identificación', valCe.resultado);
              }
            }
          );
        }

      }



    } else {
      Object.keys(this.formulario.controls).forEach(field => { // {1}
        const control = this.formulario.get(field);
        control.markAsDirty({ onlySelf: true });            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });

    }

  }

  guardadoFinal() {
    var cli = this.formulario.getRawValue();





    this.appComponent.loader = true; //activar cargando

    const form = {
      id: this.formulario.get('id').value,
      tipo_identificacion: this.formulario.get('tipo_identificacion').value,
      identificacion: cli.tipo_identificacion == "04" ? null : this.formulario.get('identificacion').value,
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
      grupo: this.formulario.get('grupo').value,

    }
    this.index = this.table.length
    console.log(this.index)
    if (form.id == null) {
      form.id = this.index
      this.table.push(form)
    } else {
      var existe = this.table.find(e => e.id == form.id);
      this.table[this.table.indexOf(existe)] = form;

    }




    this.calcular_part();
    this.nuevofurmulario();
    this.appComponent.loader = false; //desactivar cargando 




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

  modificaEdad() {
    this.formulario.patchValue({ fecha_nacimiento: null });

  }




  // clone(event) {
  //   var existe = this.table.find(e => e.identificacion == event.identificacion && e.grupo_id == this.gruposelect.id  && e.primer_nombre == event.primer_nombre && e.primer_apellido == event.primer_apellido);
  //   var existe2 = null
  //   if(this.gruposelect.name.includes('CONYU'))
  //   {
  //    existe2 = this.table.find(e => e.identificacion == event.identificacion && e.grupo_name.includes('HIJO') && e.primer_nombre == event.primer_nombre && e.primer_apellido == event.primer_apellido);

  //   }
  //   if(this.gruposelect.name.includes('HIJO'))
  //   {
  //    existe2 = this.table.find(e => e.identificacion == event.identificacion && e.grupo_name.includes('CONYU') && e.primer_nombre == event.primer_nombre && e.primer_apellido == event.primer_apellido);
  //   }


  //   if(this.confGrupo.gxp_num_per <= this.table.filter(e => e.grupo_id == this.gruposelect.code).length  && this.gruposelect.code !=1){
  //     this.appComponent.message('warn', 'Atención', 'No puede superar el maximo número de persona configurado');
  //   }else if((this.confGrupo.gxp_edad_min >   event.edad)  || ( event.edad > this.confGrupo.gxp_edad_max)  && this.gruposelect.code !=1 ){
  //     this.appComponent.message('warn', 'Atención', 'La edad ingresada no esta permitida para este grupo.');
  //   }else{
  //   if (!existe && !(this.gruposelect.code == 1) && !existe2 ) {
  //     const form = {

  //       tipo_identificacion: event.tipo_identificacion,
  //       identificacion: event.identificacion,
  //       primer_nombre: event.primer_nombre,
  //       segundo_nombre: event.segundo_nombre,
  //       primer_apellido: event.primer_apellido,
  //       segundo_apellido: event.segundo_apellido,
  //       genero: event.genero,
  //       paren: event.paren,
  //       paren_name: event.paren_name,
  //       fecha_nacimiento: event.fecha_nacimiento,
  //       edad: event.edad,
  //       participacion: null,
  //       grupo_id: this.gruposelect.code,
  //       grupo_name: this.gruposelect.name
  //     }

  //     this.table.push(form)
  //     this.nuevofurmulario();
  //   }
  //   else {
  //     this.appComponent.message('warn', 'Atención', 'Ya existe para este grupo o no se puede duplicar.');
  //   }
  // }
  // }
}
