import { Pedido } from '../../Modulos/pedido';

export class NodoH {
  pedido: Pedido;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
  }
}