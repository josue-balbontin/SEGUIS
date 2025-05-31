import { Equipos } from './equipos';

export interface Pedido {
  numero: number;
  cliente: string;
  ciudadDestino: string;
  fechaPedido: Date;
  entregado: boolean;
  equipos: Equipos[]; // Array de equipos del pedido con tipado correcto
  total?: number; // Total del pedido (opcional)
}
