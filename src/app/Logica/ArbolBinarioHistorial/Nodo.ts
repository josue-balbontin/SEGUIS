import { Pedido } from '../../Modulos/pedido';

export class NodoArbol {
  pedido: Pedido;
  izquierdo: NodoArbol | null;
  derecho: NodoArbol | null;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
    this.izquierdo = null;
    this.derecho = null;
  }
}