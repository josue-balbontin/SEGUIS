import { Pedido } from '../../Modulos/pedido';
import { NodoCola } from './Nodo';

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


  estaVacia(): boolean {
    return this.frente === null;
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



}
