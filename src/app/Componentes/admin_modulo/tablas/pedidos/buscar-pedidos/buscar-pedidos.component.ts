import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../../Servicios/pedidos/pedidos.service';
import { Pedido } from '../../../../../Modulos/pedido';

@Component({
  selector: 'app-buscar-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar-pedidos.component.html',
  styleUrl: './buscar-pedidos.component.css'
})
export class BuscarPedidosComponent implements OnInit {
  // Variables para búsqueda
  numeroBusqueda: number = 0;
  pedidoEncontrado: Pedido | null = null;
  ciudadPedido: string | null = null;

  // Variables de control
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {}

  // Consultar a qué ciudad pertenece un número de pedido
  buscarPedidoPorNumero(): void {
    this.limpiarMensajes();

    if (!this.numeroBusqueda || this.numeroBusqueda <= 0) {
      this.mensajeError = 'Ingrese un número de pedido válido';
      return;
    }

    // Buscar en el árbol binario
    this.pedidoEncontrado = this.pedidosService.buscarPedidoPorNumero(this.numeroBusqueda);
    
    if (this.pedidoEncontrado) {
      this.mensajeExito = `Pedido #${this.numeroBusqueda} encontrado`;
    } else {
      this.pedidoEncontrado = null;
      this.ciudadPedido = null;
      this.mensajeError = `No se encontró el pedido #${this.numeroBusqueda}`;
    }
  }

  // Limpiar búsqueda
  limpiarBusqueda(): void {
    this.numeroBusqueda = 0;
    this.pedidoEncontrado = null;
    this.ciudadPedido = null;
    this.limpiarMensajes();
  }

  // Limpiar mensajes
  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }

  // Formatear fecha
  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Obtener equipos de un pedido como string
  obtenerEquiposPedido(pedido: Pedido): string {
    return pedido.equipos.map(eq => eq.nombre).join(', ');
  }
}
