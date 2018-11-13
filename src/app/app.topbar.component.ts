import { Component } from '@angular/core';
import { AppComponent} from './app.component';
import { ApiRequestService } from './services/api-request.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    constructor(public app: AppComponent,private api: ApiRequestService) {
     console.log(this.api.getInfoUsuario()) ;
    }
}
