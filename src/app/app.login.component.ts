import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>` 
  })
  export class AppLoginComponent{ 
    loader: boolean = false;
    constructor(){
      this.loader = true;
  }
  }