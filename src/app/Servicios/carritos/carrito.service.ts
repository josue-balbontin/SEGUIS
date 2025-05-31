import { Injectable } from '@angular/core';
import { Equipos } from '../../Modulos/equipos';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito : Equipos[] = [];

  constructor() { }

  agregarproducto(producto: Equipos): void {
    this.carrito.push(producto);
  }

  eliminarproducto(indice : number): void {
    if (indice >= 0 && indice < this.carrito.length) {
      this.carrito.splice(indice, 1);
    } else {
      console.error('Índice fuera de rango');
    }
  }

  getCarrito(): Equipos[] {
    return this.carrito;
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }
  
  obtenerCantidadProductos(): number {
    return this.carrito.length;
  }
  
}
