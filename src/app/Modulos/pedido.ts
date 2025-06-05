import { Equipos } from './equipos';

export interface Pedido {
  numero: number;
  cliente: string;
  ciudadDestino: string;
  fecha: Date;
  entregado: boolean;
  estado: string; // 'Pendiente' | 'Entregado'
  equipos: Equipos[]; // Array de equipos del pedido con tipado correcto
  total?: number; 
}
