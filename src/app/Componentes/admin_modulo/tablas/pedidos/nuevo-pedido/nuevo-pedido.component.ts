import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../../Servicios/pedidos/pedidos.service';
import { EquiposService } from '../../../../../Servicios/equipos/equipos.service';
import { Equipos } from '../../../../../Modulos/equipos';

@Component({
  selector: 'app-nuevo-pedido',
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-pedido.component.html',
  styleUrl: './nuevo-pedido.component.css'
})
export class NuevoPedidoComponent implements OnInit {
  @Output() pedidoCreado = new EventEmitter<string>();

  // Variables para el formulario de nuevo pedido
  nuevoPedido = {
    cliente: '',
    ciudadDestino: '',
    equiposSeleccionados: [] as number[]
  };

  // Listas y opciones
  ciudadesValidas: string[] = [];
  equiposDisponibles: Equipos[] = [];

  // Variables de control
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private pedidosService: PedidosService,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.ciudadesValidas = this.pedidosService.obtenerCiudadesValidas();
    this.equiposDisponibles = this.equiposService.getEquipos();
  }

  // Registrar un nuevo pedido
  registrarPedido(): void {
    this.limpiarMensajes();

    // Validaciones
    if (!this.nuevoPedido.cliente.trim()) {
      this.mensajeError = 'El nombre del cliente es requerido';
      return;
    }

    if (!this.nuevoPedido.ciudadDestino) {
      this.mensajeError = 'Debe seleccionar una ciudad destino';
      return;
    }

    if (this.nuevoPedido.equiposSeleccionados.length === 0) {
      this.mensajeError = 'Debe seleccionar al menos un equipo';
      return;
    }

    // Obtener equipos seleccionados
    const equiposSeleccionados = this.equiposDisponibles.filter(
      equipo => this.nuevoPedido.equiposSeleccionados.includes(equipo.id)
    );

    try {
      // Crear el pedido usando el servicio
      const pedidoCreado = this.pedidosService.crearPedido(
        this.nuevoPedido.cliente,
        this.nuevoPedido.ciudadDestino,
        equiposSeleccionados
      );

      this.mensajeExito = `Pedido #${pedidoCreado.numero} registrado exitosamente para ${pedidoCreado.cliente}`;
      this.limpiarFormulario();
      
      // Emitir evento para notificar al componente padre
      this.pedidoCreado.emit(this.mensajeExito);
    } catch (error) {
      this.mensajeError = 'Error al registrar el pedido: ' + error;
    }
  }

  // Verificar si un equipo está seleccionado
  isEquipoSeleccionado(equipoId: number): boolean {
    return this.nuevoPedido.equiposSeleccionados.includes(equipoId);
  }

  // Toggle selección de equipo
  toggleEquipoSeleccion(equipoId: number): void {
    const index = this.nuevoPedido.equiposSeleccionados.indexOf(equipoId);
    if (index > -1) {
      this.nuevoPedido.equiposSeleccionados.splice(index, 1);
    } else {
      this.nuevoPedido.equiposSeleccionados.push(equipoId);
    }
  }

  // Obtener total de pedido actual
  obtenerTotalPedido(): number {
    return this.equiposDisponibles
      .filter(equipo => this.nuevoPedido.equiposSeleccionados.includes(equipo.id))
      .reduce((total, equipo) => total + (equipo.precio || 0), 0);
  }

  // Limpiar formulario
  limpiarFormulario(): void {
    this.nuevoPedido = {
      cliente: '',
      ciudadDestino: '',
      equiposSeleccionados: []
    };
  }

  // Limpiar mensajes
  limpiarMensajes(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
