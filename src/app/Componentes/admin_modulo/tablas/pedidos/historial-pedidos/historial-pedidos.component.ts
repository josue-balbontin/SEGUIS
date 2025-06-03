import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../../Servicios/pedidos/pedidos.service';
import { Pedido } from '../../../../../Modulos/pedido';

@Component({
  selector: 'app-historial-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-pedidos.component.html',
  styleUrl: './historial-pedidos.component.css'
})
export class HistorialPedidosComponent implements OnInit {
  // Variables para mostrar datos
  todosPedidos: Pedido[] = [];
  clienteBusqueda: string = '';

  // Variables de control
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.actualizarVista();
  }

  // Actualizar vista con datos frescos
  actualizarVista(): void {
    this.todosPedidos = this.pedidosService.obtenerTodosPedidosOrdenados();
  }

  // Buscar pedidos por cliente
  buscarPedidosPorCliente(): void {
    this.limpiarMensajes();

    if (!this.clienteBusqueda.trim()) {
      this.mensajeError = 'Ingrese el nombre del cliente';
      return;
    }

    const pedidosCliente = this.pedidosService.buscarPedidosPorCliente(this.clienteBusqueda);
    
    if (pedidosCliente.length > 0) {
      this.todosPedidos = pedidosCliente;
      this.mensajeExito = `Se encontraron ${pedidosCliente.length} pedido(s) para "${this.clienteBusqueda}"`;
    } else {
      this.mensajeError = `No se encontraron pedidos para "${this.clienteBusqueda}"`;
    }
  }

  // Mostrar todos los pedidos
  mostrarTodos(): void {
    this.clienteBusqueda = '';
    this.limpiarMensajes();
    this.actualizarVista();
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
