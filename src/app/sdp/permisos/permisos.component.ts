import { Component, OnInit } from '@angular/core';

import { TreeNode } from 'primeng/primeng';


import { AppComponent } from 'src/app/app.component';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { UserInfoService } from 'src/app/services/user-info.service';
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})

export class PermisosComponent implements OnInit {


  //Campo para autocompletador de empresa
  autocompletadorEmpresas: any[];
  autocompletadorPerfiles: any[];
  autocompletadorEmpresa: any;
  autocompletadorPerfil: any;

  //Campos para la tabla arbol
  arbol: TreeNode[];
  arbolSeleccion: TreeNode[];

  //Listado de menus cargados de acuerdo al perfil
  listaMenuPrevia: any[];

  //Listado de menus a ser guardados en la tabla perfil menu
  listaMenu: any[];
  guardarboton: boolean;
  empresas: SelectItem[];
  perfiles: SelectItem[];


  tituloHTML: string = 'Perfil Menú';


  constructor(private api: ApiRequestService,public appComponent: AppComponent ) { }




  ngOnInit() {

    this.guardarboton = true;

    this.api.get('/api/Perfiles/listar' , this.tituloHTML).subscribe(
      res => {
        this.perfiles = [];
        if (res != null) {
          this.perfiles.push({ label: 'Elegir Perfil', value: null })
          for (let i = 0; i < res.length; i++) {
            this.perfiles.push({ label: res[i].per_descripcion, value: res[i].per_codigo_perfil });
          }
        }
   
    
        this.arbol = null;
      });

  }


 
  seleccionarPerfil(evento ) {

    let idPerfil = evento.value;

    this.arbolSeleccion = [];
    this.api.get('/api/Opciones/listar' , this.tituloHTML).subscribe(
      data => {
        if (data != null) {
          this.arbol = [];
        
          for (let i = 0; i < data.length; i++) {
            this.arbol.push({ label: data[i].opc_descripcion, data: data[i].opc_codigo_opcion });
          }
        
         // this.arbol = data;
          this.guardarboton = false;
          this.arbol.forEach(nodoSeleccionado => {
   
            this.api.get('/api/Permisos/listar/' +idPerfil, this.tituloHTML).subscribe(
              codigosMenu => {
          
                this.listaMenuPrevia = codigosMenu;
                this.seleccionarMenuPerfil(nodoSeleccionado);
              }
            )

          });
        }
      }
    );
  }



  seleccionarMenuPerfil(nodo: TreeNode) {

    if (nodo.data != null  && this.listaMenuPrevia.filter(dato => dato.opc_codigo_opcion == nodo.data).length > 0) {
      this.arbolSeleccion.push(nodo);
    }

    if (nodo.children != null && nodo.children.length > 0) {
      nodo.children.forEach(hijo => {
        this.seleccionarMenuPerfil(hijo);
      })

    }
  }



  guardar() {

    this.listaMenu = [];

    this.arbolSeleccion.forEach(
      nodoSeleccionado => {
     
        if (nodoSeleccionado != null ) {
          this.listaMenu.push(nodoSeleccionado.data)
        }
      }
    );

    const perfilMenuEnviar = { codigosMenu: this.listaMenu, per_codigo_perfil: +this.autocompletadorPerfil };

   // this.appComponent.loader = true;
    this.api.post('/api/Permisos/guardar', perfilMenuEnviar, this.tituloHTML).subscribe(res => {

        this.appComponent.message('success', 'Exitoso', 'Se guardo correctamente.');
       
     // this.appComponent.loader = false; //desactivar cargando
    },
      error => {
        this.appComponent.message('error', 'Error', error);
    
        //this.appComponent.loader = false; //desactivar cargando        
      }
    );


  }


}
