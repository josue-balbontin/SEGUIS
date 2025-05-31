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
      fechaPedido: new Date(),
      entregado: false,
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
    return this.hashMapPedidos.procesarSiguientePedido(ciudad);
  }

  buscarPedidosPorCliente(cliente: string): Pedido[] {
    return this.arbolHistorial.buscarPorCliente(cliente);
  }
}
