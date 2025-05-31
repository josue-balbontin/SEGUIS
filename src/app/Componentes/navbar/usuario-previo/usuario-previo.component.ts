import { Component, Input, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuario-previo',
  imports: [],
  templateUrl: './usuario-previo.component.html',
  styleUrl: './usuario-previo.component.css'
})
export class UsuarioPrevioComponent {

  @Input() showUserMenu : WritableSignal<Boolean> = signal(true); 

  
  constructor(private router : Router ){

  }

    seleccionar(item: string) {
      if(item=='admin'){
        this.router.navigate(["/Admin"])
        
      } 
      this.showUserMenu.set(false); 
  }
}
