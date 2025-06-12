import { Injectable } from '@angular/core';
import { HashMapHistorial } from '../../Logica/Hashmap Historial/HashmapH';
import { HashMapPedidos } from '../../Logica/HashMapPedidos/HashMap';
import { Pedido } from '../../Modulos/pedido';
import { Equipos } from '../../Modulos/equipos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private Hashmaphistorial: HashMapHistorial;
  private hashMapPedidos: HashMapPedidos;
  private contadorPedidos: number = 1000;

  constructor() {
    this.Hashmaphistorial = new HashMapHistorial();
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

    this.Hashmaphistorial.insertar(nuevoPedido);
    
    this.hashMapPedidos.agregarPedido(nuevoPedido);

    return nuevoPedido;
  }

  obtenerTodosPedidosOrdenados(): Pedido[] {
    return this.Hashmaphistorial.obtenertodoslospedidos();
  }

  buscarPedidoPorNumero(numero: number): Pedido | null {
    return this.Hashmaphistorial.buscar(numero);
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
    return this.Hashmaphistorial.buscarPorCliente(cliente);
  }

  // Métodos adicionales para el componente
  obtenerCiudadesValidas(): string[] {
    return this.hashMapPedidos.obtenerCiudades();
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
