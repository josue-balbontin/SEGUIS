import { Pedido } from '../../Modulos/pedido';
import { Cola } from '../Cola/cola';


export class HashMapPedidos {
  private ciudades: string[] = [
    'Santa Cruz',
    'La Paz', 
    'Cochabamba',
    'Pando',
    'Beni',
    'Oruro',
    'Potosi',
    'Chuquisaca',
    'Tarija'
  ];
  
  private tabla: (Cola | null)[];
  private tamaño: number;

  constructor() {
    this.tamaño = this.ciudades.length;
    this.tabla = new Array(this.tamaño);
    for (let i = 0; i < this.tamaño; i++) {
      this.tabla[i] = null;
    }
  }

  private funcionHash(ciudad: string): number {
    const indice = this.ciudades.indexOf(ciudad);
    
    if (indice === -1) {
      throw new Error(`Ciudad '${ciudad}' no válida. Ciudades válidas: ${this.ciudades.join(', ')}`);
    }
    
    return indice;
  }

  agregarPedido(pedido: Pedido): void {
    const indice = this.funcionHash(pedido.ciudadDestino);
    
    if (this.tabla[indice] === null) {
      this.tabla[indice] = new Cola();
    }
    
    this.tabla[indice]!.encolar(pedido);
  }


  obtenerColaCiudad(ciudad: string): Cola | null {
    const indice = this.funcionHash(ciudad);
    return this.tabla[indice];
  }

  obtenerPedidosCiudad(ciudad: string): Pedido[] {
    const cola = this.obtenerColaCiudad(ciudad);
    return cola ? cola.obtenerTodosPedidos() : [];
  }
  
  procesarSiguientePedido(ciudad: string): Pedido | null {
    const cola = this.obtenerColaCiudad(ciudad);
    
    if (cola === null || cola.estaVacia()) {
      return null;
    }
    
    const pedido = cola.desencolar();
    if (pedido) {
      pedido.entregado = true;
    }
    
    return pedido;
  }

  // Métodos adicionales para el servicio
  obtenerCiudades(): string[] {
    return [...this.ciudades];
  }

  buscarCiudadPorPedido(numeroPedido: number): string | null {
    for (const ciudad of this.ciudades) {
      const cola = this.obtenerColaCiudad(ciudad);
      if (cola && cola.contienePedido(numeroPedido)) {
        return ciudad;
      }
    }
    return null;
  }

  obtenerTodosPedidosCiudad(ciudad: string): Pedido[] {
    return this.obtenerPedidosCiudad(ciudad);
  }
}