import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../../../Servicios/pedidos/pedidos.service';
import { EquiposService } from '../../../../Servicios/equipos/equipos.service';
import { Pedido } from '../../../../Modulos/pedido';
import { Equipos } from '../../../../Modulos/equipos';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  // Variables para el formulario de nuevo pedido
  nuevoPedido = {
    cliente: '',
    ciudadDestino: '',
    equiposSeleccionados: [] as number[]
  };

  // Variables para mostrar datos
  todosPedidos: Pedido[] = [];
  pedidosPorCiudad: Pedido[] = [];
  ciudadSeleccionada: string = '';
  numeroBusqueda: number = 0;
  clienteBusqueda: string = '';
  pedidoEncontrado: Pedido | null = null;
  ciudadPedido: string | null = null;

  // Listas y opciones
  ciudadesValidas: string[] = [];
  equiposDisponibles: Equipos[] = [];
  estadisticasCiudades: any[] = [];
  resumenSistema: any = {};

  // Variables de control
  vistaActual: string = 'registrar'; // registrar, historial, colas, buscar, estadisticas
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private pedidosService: PedidosService,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
    this.actualizarVistas();
  }

  cargarDatosIniciales(): void {
    this.ciudadesValidas = this.pedidosService.obtenerCiudadesValidas();
    this.equiposDisponibles = this.equiposService.getEquipos();
    if (this.ciudadesValidas.length > 0) {
      this.ciudadSeleccionada = this.ciudadesValidas[0];
    }
  }

  // Cambiar vista activa
  cambiarVista(vista: string): void {
    this.vistaActual = vista;
    this.limpiarMensajes();
    this.actualizarVistas();
  }

  // Actualizar todas las vistas con datos frescos
  actualizarVistas(): void {
    this.todosPedidos = this.pedidosService.obtenerTodosPedidosOrdenados();
    this.pedidosPorCiudad = this.pedidosService.obtenerPedidosPorCiudad(this.ciudadSeleccionada);
    this.estadisticasCiudades = this.pedidosService.obtenerEstadisticasPorCiudad();
    this.resumenSistema = this.pedidosService.obtenerResumenSistema();
  }

  // FUNCIONALIDAD 1: Registrar un nuevo pedido
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
      this.actualizarVistas();
    } catch (error) {
      this.mensajeError = 'Error al registrar el pedido: ' + error;
    }
  }

  // FUNCIONALIDAD 2: Ya implementada - Mostrar pedidos ordenados por número
  // Se muestra en la vista 'historial' con this.todosPedidos

  // FUNCIONALIDAD 3: Ya implementada - Mostrar cola de entrega por ciudad
  // Se muestra en la vista 'colas' con this.pedidosPorCiudad

  // FUNCIONALIDAD 4: Marcar pedido como entregado (SOLO ADMINISTRADOR)
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
        this.actualizarVistas();
      } else {
        this.mensajeError = `No hay pedidos pendientes en ${this.ciudadSeleccionada}`;
      }
    } catch (error) {
      this.mensajeError = 'Error al procesar entrega: ' + error;
    }
  }

  // FUNCIONALIDAD 5: Consultar a qué ciudad pertenece un número de pedido
  buscarPedidoPorNumero(): void {
    this.limpiarMensajes();

    if (!this.numeroBusqueda || this.numeroBusqueda <= 0) {
      this.mensajeError = 'Ingrese un número de pedido válido';
      return;
    }

    // Buscar en el árbol binario
    this.pedidoEncontrado = this.pedidosService.buscarPedidoPorNumero(this.numeroBusqueda);
    
    if (this.pedidoEncontrado) {
      // Buscar la ciudad en el HashMap
      this.ciudadPedido = this.pedidosService.buscarCiudadPorPedido(this.numeroBusqueda);
      this.mensajeExito = `Pedido #${this.numeroBusqueda} encontrado`;
    } else {
      this.pedidoEncontrado = null;
      this.ciudadPedido = null;
      this.mensajeError = `No se encontró el pedido #${this.numeroBusqueda}`;
    }
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

  // Actualizar cola de ciudad seleccionada
  actualizarColaCiudad(): void {
    this.pedidosPorCiudad = this.pedidosService.obtenerPedidosPorCiudad(this.ciudadSeleccionada);
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
