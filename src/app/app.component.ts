import { Component, Renderer, Compiler, OnInit } from '@angular/core';
import { UserInfoService } from './services/user-info.service';
import { ApiRequestService } from './services/api-request.service';
import { AppMessages } from './app-messages';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontEndVentasIndividuales';
  private items: any[];
  constructor(private router: Router, public renderer: Renderer, public mensaje: AppMessages, 
    private api: ApiRequestService, private userInfoService: UserInfoService,
    public Compiler: Compiler
) {
    this.Compiler.clearCache();
    

}

ngOnInit() {
  this.api.get('/api/Permisos/listarUrl/' +3, 'menu').subscribe(
    codigosMenu => {
      this.items = [];
      for (let i = 0; i < codigosMenu.length; i++) {
        var menu ;
        console.log(codigosMenu[i])
     var c ={
      label: codigosMenu[i].opc_descripcion, routerLink: codigosMenu[i].opc_url
     }
     console.log(c)
          this.items.push(c);
        
      };
    }
  )
}

logout() {
  let resultado: Subject<any> = new Subject<any>();
  this.api.postLogout('/auth/logout/')
      .subscribe(respuesta => {
          if (respuesta !== undefined && respuesta !== null) {
              resultado.next(respuesta);
          }
      }, error => {
          resultado.next(error);
      });
  this.userInfoService.removeUserInfo();
  this.router.navigate(['/login']);
}


}
