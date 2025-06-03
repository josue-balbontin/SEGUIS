import { Pedido } from '../../Modulos/pedido';
import { NodoArbol } from './Nodo';


export class ArbolBinarioHistorial {
  raiz: NodoArbol | null;

  constructor() {
    this.raiz = null;
  }

  insertar(pedido: Pedido): void {
    this.raiz = this.insertarRecursivo(this.raiz, pedido);
  }

  private insertarRecursivo(nodo: NodoArbol | null, pedido: Pedido): NodoArbol {
    if (nodo === null) {
      return new NodoArbol(pedido);
    }

    if (pedido.numero < nodo.pedido.numero) {
      nodo.izquierdo = this.insertarRecursivo(nodo.izquierdo, pedido);
    }
    else if (pedido.numero > nodo.pedido.numero) {
      nodo.derecho = this.insertarRecursivo(nodo.derecho, pedido);
    }

    return nodo;
  }

  buscar(numero: number): Pedido | null {
    return this.buscarRecursivo(this.raiz, numero);
  }

  private buscarRecursivo(nodo: NodoArbol | null, numero: number): Pedido | null {
    if (nodo === null) {
      return null;
    }

    if (numero === nodo.pedido.numero) {
      return nodo.pedido;
    }

    if (numero < nodo.pedido.numero) {
      return this.buscarRecursivo(nodo.izquierdo, numero);
    } else {
      return this.buscarRecursivo(nodo.derecho, numero);
    }
  }


  InOrder(): Pedido[] {
    const resultado: Pedido[] = [];
    this.InOrderRecursivo(this.raiz, resultado);
    return resultado;
  }

  private InOrderRecursivo(nodo: NodoArbol | null, resultado: Pedido[]): void {
    if (nodo !== null) {
      this.InOrderRecursivo(nodo.izquierdo, resultado);
      resultado.push(nodo.pedido);
      this.InOrderRecursivo(nodo.derecho, resultado);
    }
  }


  // TODO: Por si implementamos el borrar
  eliminar(numero: number): void {
    this.raiz = this.eliminarRecursivo(this.raiz, numero);
  }

  private eliminarRecursivo(nodo: NodoArbol | null, numero: number): NodoArbol | null {
    if (nodo === null) {
      return null;
    }

    if (numero < nodo.pedido.numero) {
      nodo.izquierdo = this.eliminarRecursivo(nodo.izquierdo, numero);
    } else if (numero > nodo.pedido.numero) {
      nodo.derecho = this.eliminarRecursivo(nodo.derecho, numero);
    } else {
      
      if (nodo.izquierdo === null && nodo.derecho === null) {
        return null;
      }
      
      if (nodo.izquierdo === null) {
        return nodo.derecho;
      }
      if (nodo.derecho === null) {
        return nodo.izquierdo;
      }
      
      const sucesor = this.encontrarMinimo(nodo.derecho);
      nodo.pedido = sucesor.pedido;
      nodo.derecho = this.eliminarRecursivo(nodo.derecho, sucesor.pedido.numero);
    }

    return nodo;
  }

  private encontrarMinimo(nodo: NodoArbol): NodoArbol {
    while (nodo.izquierdo !== null) {
      nodo = nodo.izquierdo;
    }
    return nodo;
  }

  estaVacio(): boolean {
    return this.raiz === null;
  }

  buscarPorCliente(cliente: string): Pedido[] {
    const resultado: Pedido[] = [];
    this.buscarPorClienteRecursivo(this.raiz, cliente, resultado);
    return resultado;
  }

  private buscarPorClienteRecursivo(nodo: NodoArbol | null, cliente: string, resultado: Pedido[]): void {
    if (nodo !== null) {
      if (nodo.pedido.cliente.toLowerCase().includes(cliente.toLowerCase())) {
        resultado.push(nodo.pedido);
      }
      this.buscarPorClienteRecursivo(nodo.izquierdo, cliente, resultado);
      this.buscarPorClienteRecursivo(nodo.derecho, cliente, resultado);
    }
  }

  buscarPorCiudad(ciudad: string): Pedido[] {
    const resultado: Pedido[] = [];
    this.buscarPorCiudadRecursivo(this.raiz, ciudad, resultado);
    return resultado;
  }

  private buscarPorCiudadRecursivo(nodo: NodoArbol | null, ciudad: string, resultado: Pedido[]): void {
    if (nodo !== null) {
      if (nodo.pedido.ciudadDestino === ciudad) {
        resultado.push(nodo.pedido);
      }
      this.buscarPorCiudadRecursivo(nodo.izquierdo, ciudad, resultado);
      this.buscarPorCiudadRecursivo(nodo.derecho, ciudad, resultado);
    }
  }
}