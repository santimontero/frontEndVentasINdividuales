import { Component, Renderer, Compiler } from '@angular/core';
import { UserInfoService } from './services/user-info.service';
import { ApiRequestService } from './services/api-request.service';
import { AppMessages } from './app-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEndVentasIndividuales';
  constructor(private router: Router, public renderer: Renderer, public mensaje: AppMessages, 
    private api: ApiRequestService, private userInfoService: UserInfoService,
    public Compiler: Compiler
) {
    this.Compiler.clearCache();
    

}

}
