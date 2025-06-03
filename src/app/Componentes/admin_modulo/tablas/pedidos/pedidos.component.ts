import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../Servicios/pedidos/pedidos.service';
import { EquiposService } from '../../../../Servicios/equipos/equipos.service';
import { Pedido } from '../../../../Modulos/pedido';
import { Equipos } from '../../../../Modulos/equipos';
import { NuevoPedidoComponent } from './nuevo-pedido/nuevo-pedido.component';
import { HistorialPedidosComponent } from './historial-pedidos/historial-pedidos.component';
import { ColasEntregaComponent } from './colas-entrega/colas-entrega.component';
import { BuscarPedidosComponent } from './buscar-pedidos/buscar-pedidos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule, NuevoPedidoComponent, HistorialPedidosComponent, ColasEntregaComponent, BuscarPedidosComponent, EstadisticasComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  @ViewChild(HistorialPedidosComponent) historialComponent!: HistorialPedidosComponent;
  @ViewChild(ColasEntregaComponent) colasComponent!: ColasEntregaComponent;
  @ViewChild(EstadisticasComponent) estadisticasComponent!: EstadisticasComponent;

  // Variables de control
  vistaActual: string = 'registrar'; // registrar, historial, colas, buscar, estadisticas
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private pedidosService: PedidosService,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {
    // La inicialización se maneja en cada componente hijo
  }

  // Cambiar vista activa
  cambiarVista(vista: string): void {
    this.vistaActual = vista;
    this.limpiarMensajes();
    this.actualizarVistas();
  }

  // Actualizar todas las vistas con datos frescos
  actualizarVistas(): void {
    // Actualizar componentes hijos si están disponibles
    setTimeout(() => {
      if (this.historialComponent) {
        this.historialComponent.actualizarVista();
      }
      if (this.colasComponent) {
        this.colasComponent.actualizarVista();
      }
      if (this.estadisticasComponent) {
        this.estadisticasComponent.refrescarEstadisticas();
      }
    });
  }

  // Manejar eventos de los componentes hijos
  onPedidoCreado(mensaje: string): void {
    this.mensajeExito = mensaje;
    this.actualizarVistas();
  }

  onEntregaProcesada(mensaje: string): void {
    this.mensajeExito = mensaje;
    this.actualizarVistas();
  }

  // Limpiar mensajes
  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
