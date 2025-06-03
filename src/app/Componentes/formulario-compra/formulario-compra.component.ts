import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../Servicios/carritos/carrito.service';
import { Router } from '@angular/router';
import { PedidosService } from '../../Servicios/pedidos/pedidos.service';


@Component({
  selector: 'app-formulario-compra',
  imports: [ReactiveFormsModule, FormsModule, CommonModule ],
  templateUrl: './formulario-compra.component.html',
  styleUrl: './formulario-compra.component.css'
})
export class FormularioCompraComponent {

  @Input() mostrarFormulario  : WritableSignal<boolean> =  signal(true);
  
  @Input() mostrarAviso : WritableSignal<boolean> = signal(false);

  nombre : string = '';
  apellido : string = '';  envios : string[] = [
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
  metodoPago : string = '';
  metodosPago : string[] = [
    'Tarjeta de Crédito',
    'Tarjeta de Débito',
    'PayPal',
    'Transferencia Bancaria',
    'Pago contra entrega',
    'QR Boliviano'
  ];

  // Propiedades para simulador de pago
  numeroTarjeta: string = '';
  fechaVencimiento: string = '';
  cvv: string = '';
  nombreTitular: string = '';
  emailPayPal: string = '';
  numeroCuenta: string = '';
  codigoQR: string = '';

  constructor( private carrito : CarritoService , private router : Router , private pedidos : PedidosService){};

  onSubmit(form: NgForm) {
    if (form.valid) {
      const datosCompra = {
        nombre: this.nombre,
        apellido: this.apellido,
        ciudad: this.ciudad,
        metodoPago: this.metodoPago,
        datosPago: this.obtenerDatosPago()
      };

      console.log('Datos de compra:', datosCompra);

      this.cerrarFormulario();
    }
  }

  cerrarFormulario() {
    this.limpiarFormulario();
    this.mostrarFormulario.set(false);
  }  private limpiarFormulario() {
    this.nombre = '';
    this.apellido = '';
    this.ciudad = '';
    this.metodoPago = '';
    this.limpiarDatosPago();
  }

  private limpiarDatosPago() {
    this.numeroTarjeta = '';
    this.fechaVencimiento = '';
    this.cvv = '';
    this.nombreTitular = '';
    this.emailPayPal = '';
    this.numeroCuenta = '';
    this.codigoQR = '';
  }

  private obtenerDatosPago(): any {
    switch(this.metodoPago) {
      case 'Tarjeta de Crédito':
      case 'Tarjeta de Débito':
        return {
          numeroTarjeta: this.numeroTarjeta,
          fechaVencimiento: this.fechaVencimiento,
          cvv: this.cvv,
          nombreTitular: this.nombreTitular
        };
      case 'PayPal':
        return { emailPayPal: this.emailPayPal };
      case 'Transferencia Bancaria':
        return { numeroCuenta: this.numeroCuenta };
      case 'QR Boliviano':
        return { codigoQR: this.codigoQR };
      case 'Pago contra entrega':
        return { mensaje: 'Pago al recibir el producto' };
      default:
        return {};
    }
  }

// TODO : Implementar la lógica de confirmación de compra
  confirmarCompra() {
    this.pedidos.crearPedido(this.nombre + " " + this.apellido, this.ciudad , this.carrito.getCarrito());
    this.carrito.vaciarCarrito();
    this.mostrarAviso.set(true);
    this.mostrarFormulario.set(false);

  }; 
}
