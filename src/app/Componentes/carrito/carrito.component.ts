import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipos } from '../../Modulos/equipos';
import { CarritoService } from '../../Servicios/carritos/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true ,
  imports: [CommonModule,FormsModule  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  public mensajeerror: string = "Datos insertados no validos"; 
  public botonEjecutado: boolean = false;
  hoy : Date= new Date();
 

  carrito: Equipos[] = [];

  constructor( private carritos : CarritoService ) {
    this.carrito = this.carritos.getCarrito();
  };
 
 clickboton() {}


  eliminarproducto(indice: number): void {
    this.carritos.eliminarproducto(indice);
  }

}
