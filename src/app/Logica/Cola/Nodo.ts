import { Pedido } from '../../Modulos/pedido';

export class NodoCola {
  pedido: Pedido;
  siguiente: NodoCola | null;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
    this.siguiente = null;
  }
}
