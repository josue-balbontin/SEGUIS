import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../../Servicios/pedidos/pedidos.service';
import { Pedido } from '../../../../../Modulos/pedido';

@Component({
  selector: 'app-colas-entrega',
  imports: [CommonModule, FormsModule],
  templateUrl: './colas-entrega.component.html',
  styleUrl: './colas-entrega.component.css'
})
export class ColasEntregaComponent implements OnInit {
  @Output() entregaProcesada = new EventEmitter<string>();

  // Variables para mostrar datos
  pedidosPorCiudad: Pedido[] = [];
  ciudadSeleccionada: string = '';

  // Listas y opciones
  ciudadesValidas: string[] = [];

  // Variables de control
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.actualizarVista();
  }

  cargarDatosIniciales(): void {
    this.ciudadesValidas = this.pedidosService.obtenerCiudadesValidas();
    if (this.ciudadesValidas.length > 0) {
      this.ciudadSeleccionada = this.ciudadesValidas[0];
    }
  }

  // Actualizar vista con datos frescos
  actualizarVista(): void {
    this.pedidosPorCiudad = this.pedidosService.obtenerPedidosPorCiudad(this.ciudadSeleccionada);
  }

  // Marcar pedido como entregado (SOLO ADMINISTRADOR)
  procesarSiguienteEntrega(): void {
    this.limpiarMensajes();

    if (!this.ciudadSeleccionada) {
      this.mensajeError = 'Debe seleccionar una ciudad';
      return;
    }

    try {
      const pedidoEntregado = this.pedidosService.procesarSiguientePedido(this.ciudadSeleccionada);
      
      if (pedidoEntregado) {
        this.mensajeExito = `Pedido #${pedidoEntregado.numero} de ${pedidoEntregado.cliente} marcado como entregado en ${this.ciudadSeleccionada}`;
        this.actualizarVista();
        
        // Emitir evento para notificar al componente padre
        this.entregaProcesada.emit(this.mensajeExito);
      } else {
        this.mensajeError = `No hay pedidos pendientes en ${this.ciudadSeleccionada}`;
      }
    } catch (error) {
      this.mensajeError = 'Error al procesar entrega: ' + error;
    }
  }

  // Actualizar cola de ciudad seleccionada
  actualizarColaCiudad(): void {
    this.limpiarMensajes();
    this.pedidosPorCiudad = this.pedidosService.obtenerPedidosPorCiudad(this.ciudadSeleccionada);
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
