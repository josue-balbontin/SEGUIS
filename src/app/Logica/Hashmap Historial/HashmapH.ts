import { Pedido } from '../../Modulos/pedido';

export class HashMapHistorial {
  private tabla: (Pedido | null)[];
  
  constructor() {
    this.tabla = new Array();

  }

  private funcionHash(numero: number): number {
    return numero - 1001;
  }

  public insertar(pedido: Pedido): void {
    this.tabla.push(pedido);
  }


  public obtenertodoslospedidos(): Pedido[] {
    return this.tabla.filter(pedido => pedido !== null) as Pedido[];
  }

  public buscar(numeroPedido: number): Pedido | null {
    const index = this.funcionHash(numeroPedido);
    if (index >= 0 && index < this.tabla.length) {
      return this.tabla[index];
    }
    return null;
  }

  buscarPorCliente(cliente: string): Pedido[] {
    return this.tabla.filter(pedido => 
      pedido !== null && 
      pedido.cliente.toLowerCase().includes(cliente.toLowerCase())
    ) as Pedido[];
  }




}