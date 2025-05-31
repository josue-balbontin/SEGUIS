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
       if(item=='perfil'){
       this.router.navigate(["/Perfil"])
      }
      else if(item=='historial'){
        this.router.navigate(["/Historial"])
      }
      else if(item=='admin'){
        this.router.navigate(["/admin"])
      } 
      this.showUserMenu.set(false); 
  }
}
