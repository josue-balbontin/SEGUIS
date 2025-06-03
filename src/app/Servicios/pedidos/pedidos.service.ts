import { Injectable } from '@angular/core';
import { ArbolBinarioHistorial } from '../../Logica/ArbolBinarioHistorial/ArbolBinario';
import { HashMapPedidos } from '../../Logica/HashMapPedidos/HashMap';
import { Pedido } from '../../Modulos/pedido';
import { Equipos } from '../../Modulos/equipos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private arbolHistorial: ArbolBinarioHistorial;
  private hashMapPedidos: HashMapPedidos;
  private contadorPedidos: number = 1000;

  constructor() {
    this.arbolHistorial = new ArbolBinarioHistorial();
    this.hashMapPedidos = new HashMapPedidos();
  }
  crearPedido(cliente: string, ciudadDestino: string, equipos: Equipos[]): Pedido {
    this.contadorPedidos++;
    
    const total = equipos.reduce((sum, equipo) => sum + (equipo.precio || 0), 0);
    
    const nuevoPedido: Pedido = {
      numero: this.contadorPedidos,
      cliente,
      ciudadDestino,
      fecha: new Date(),
      entregado: false,
      estado: 'Pendiente',
      equipos,
      total
    };

    this.arbolHistorial.insertar(nuevoPedido);
    
    this.hashMapPedidos.agregarPedido(nuevoPedido);

    return nuevoPedido;
  }

  obtenerTodosPedidosOrdenados(): Pedido[] {
    return this.arbolHistorial.InOrder();
  }

  buscarPedidoPorNumero(numero: number): Pedido | null {
    return this.arbolHistorial.buscar(numero);
  }

  obtenerPedidosPorCiudad(ciudad: string): Pedido[] {
    return this.hashMapPedidos.obtenerPedidosCiudad(ciudad);
  }
  procesarSiguientePedido(ciudad: string): Pedido | null {
    const pedido = this.hashMapPedidos.procesarSiguientePedido(ciudad);
    if (pedido) {
      pedido.estado = 'Entregado';
    }
    return pedido;
  }
  buscarPedidosPorCliente(cliente: string): Pedido[] {
    return this.arbolHistorial.buscarPorCliente(cliente);
  }

  // Métodos adicionales para el componente
  obtenerCiudadesValidas(): string[] {
    return this.hashMapPedidos.obtenerCiudades();
  }

  buscarCiudadPorPedido(numeroPedido: number): string | null {
    return this.arbolHistorial.buscarCiudadPorPedido(numeroPedido);
  }

  obtenerEstadisticasPorCiudad(): any[] {
    const ciudades = this.obtenerCiudadesValidas();
    const todosPedidos = this.obtenerTodosPedidosOrdenados();
    
    return ciudades.map(ciudad => {
      const pedidosCiudad = todosPedidos.filter((p: Pedido) => p.ciudadDestino === ciudad);
      const pendientes = pedidosCiudad.filter((p: Pedido) => !p.entregado).length;
      const entregados = pedidosCiudad.filter((p: Pedido) => p.entregado).length;
      const ingresos = pedidosCiudad
        .filter((p: Pedido) => p.entregado)
        .reduce((sum, p) => sum + (p.total || 0), 0);
      
      return {
        ciudad,
        total: pedidosCiudad.length,
        pendientes,
        entregados,
        ingresos
      };
    });
  }

  obtenerResumenSistema(): any {
    const todosPedidos = this.obtenerTodosPedidosOrdenados();
    const pedidosPendientes = todosPedidos.filter((p: Pedido) => !p.entregado).length;
    const pedidosEntregados = todosPedidos.filter((p: Pedido) => p.entregado).length;
    const ingresosTotales = todosPedidos
      .filter((p: Pedido) => p.entregado)
      .reduce((sum, p) => sum + (p.total || 0), 0);

    return {
      totalPedidos: todosPedidos.length,
      pedidosPendientes,
      pedidosEntregados,
      ingresosTotales
    };
  }
}
