import { Pedido } from '../../Modulos/pedido';

export class NodoCola {
  pedido: Pedido;
  siguiente: NodoCola | null;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
    this.siguiente = null;
  }
}

export class Cola {
  private frente: NodoCola | null;
  private final: NodoCola | null;
  private tamaño: number;

  constructor() {
    this.frente = null;
    this.final = null;
    this.tamaño = 0;
  }

  encolar(pedido: Pedido): void {
    const nuevoNodo = new NodoCola(pedido);
    
    if (this.estaVacia()) {
      this.frente = nuevoNodo;
      this.final = nuevoNodo;
    } else {
      this.final!.siguiente = nuevoNodo;
      this.final = nuevoNodo;
    }
    
    this.tamaño++;
  }

  desencolar(): Pedido | null {
    if (this.estaVacia()) {
      return null;
    }

    const pedidoRemoido = this.frente!.pedido;
    this.frente = this.frente!.siguiente;
    
    if (this.frente === null) {
      this.final = null;
    }
    
    this.tamaño--;
    return pedidoRemoido;
  }

  verFrente(): Pedido | null {
    if (this.estaVacia()) {
      return null;
    }
    return this.frente!.pedido;
  }

  estaVacia(): boolean {
    return this.frente === null;
  }

  obtenerTamaño(): number {
    return this.tamaño;
  }

  obtenerTodosPedidos(): Pedido[] {
    const resultado: Pedido[] = [];
    let actual = this.frente;
    
    while (actual !== null) {
      resultado.push(actual.pedido);
      actual = actual.siguiente;
    }
    
    return resultado;
  }


  marcarComoEntregado(numero: number): boolean {
    let actual = this.frente;
    
    while (actual !== null) {
      if (actual.pedido.numero === numero) {
        actual.pedido.entregado = true;
        return true;
      }
      actual = actual.siguiente;
    }
    
    return false;
  }

  contienePedido(numeroPedido: number): boolean {
    let actual = this.frente;
    
    while (actual !== null) {
      if (actual.pedido.numero === numeroPedido) {
        return true;
      }
      actual = actual.siguiente;
    }
    
    return false;
  }
}


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