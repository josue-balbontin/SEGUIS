import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../../../../Servicios/pedidos/pedidos.service';

@Component({
  selector: 'app-estadisticas',
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  // Variables para estadísticas
  estadisticasCiudades: any[] = [];
  resumenSistema: any = {};

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.actualizarVista();
  }

  // Actualizar vista con datos frescos
  actualizarVista(): void {
    this.estadisticasCiudades = this.pedidosService.obtenerEstadisticasPorCiudad();
    this.resumenSistema = this.pedidosService.obtenerResumenSistema();
  }

  // Método público para refrescar datos desde el componente padre
  refrescarEstadisticas(): void {
    this.actualizarVista();
  }
}
