import { Component, createNgModuleRef } from '@angular/core';
import {Router} from '@angular/router';
import { PedidosComponent } from '../tablas/pedidos/pedidos.component';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [PedidosComponent],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
//TODO : Agregar los componentes de las tablas
export class AdministradorComponent {
  tablas : string[] = ["Pedidos"];
  
  item : string = 'Pedidos';

  constructor(public  router: Router) {
  }

  clickitem(item : string){
    this.item = item;
  }



}
