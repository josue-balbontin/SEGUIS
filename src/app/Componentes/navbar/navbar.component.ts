import { Component, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioPrevioComponent } from './usuario-previo/usuario-previo.component';
import { CarritoService } from '../../Servicios/carritos/carrito.service';
import { CarritoComponent } from '../carrito/carrito.component';

@Component({
  selector: 'app-navbar',
  imports: [UsuarioPrevioComponent ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showUserMenu : WritableSignal<boolean> = signal(false);
  showCarrito: WritableSignal<boolean> = signal(false);
  constructor( private router : Router , private carrito : CarritoService) { }

  botonhome() {
    this.router.navigate(['/home']); 
  }

  toggleUserMenu() {
    this.showUserMenu.set(!this.showUserMenu());
  }

  totalproductos(): number {
    return this.carrito.obtenerCantidadProductos();
  }

  mostrarcarrito() {
    this.router.navigate(['/Carrito']);
  }
}
