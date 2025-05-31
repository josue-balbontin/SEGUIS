import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipos } from '../../Modulos/equipos';
import { CarritoService } from '../../Servicios/carritos/carrito.service';
import { FormularioCompraComponent } from '../formulario-compra/formulario-compra.component';

@Component({
  selector: 'app-carrito',
  standalone: true ,
  imports: [CommonModule,FormsModule , FormularioCompraComponent ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  public mensajeerror: string = "Datos insertados no validos"; 
  public botonEjecutado: boolean = false;
  
  hoy : Date= new Date();

  mostrarFormulario: WritableSignal<boolean> = signal(false);

  carrito: Equipos[] = [];

  constructor( private carritos : CarritoService ) {
    this.carrito = this.carritos.getCarrito();
  };
 
 clickboton() {
   this.mostrarFormulario.set(true);
 }


  eliminarproducto(indice: number): void {
    this.carritos.eliminarproducto(indice);
  }

}
