import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../Servicios/carritos/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-compra',
  imports: [ReactiveFormsModule, FormsModule, CommonModule ],
  templateUrl: './formulario-compra.component.html',
  styleUrl: './formulario-compra.component.css'
})
export class FormularioCompraComponent {

  @Input() mostrarFormulario  : WritableSignal<boolean> =  signal(true);
  

  nombre : string = '';
  apellido : string = '';
  envios : string[] = [
    'La Paz',
    'Santa Cruz',
    'Cochabamba',
    'Oruro',
    'Potosí',
    'Tarija',
    'Chuquisaca',
    'Beni',
    'Pando'
  ];
  ciudad : string = '';


  constructor( private carrito : CarritoService , private router : Router){}; 


  onSubmit(form: NgForm) {
    if (form.valid) {
      const datosCompra = {
        nombre: this.nombre,
        apellido: this.apellido,
        ciudad: this.ciudad
      };

      console.log('Datos de compra:', datosCompra);

      this.cerrarFormulario();
    }
  }

  cerrarFormulario() {
    this.limpiarFormulario();
    this.mostrarFormulario.set(false);
  }

  private limpiarFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.ciudad = '';

  }

// TODO : Implementar la lógica de confirmación de compra
  confirmarCompra() {

    this.carrito.vaciarCarrito();

    this.router.navigate(['/home']);

  }; 
}
