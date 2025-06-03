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
  estadisticasAdicionales: any = {};

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.actualizarVista();
  }

  // Actualizar vista con datos frescos
  actualizarVista(): void {
    this.estadisticasCiudades = this.pedidosService.obtenerEstadisticasPorCiudad();
    this.resumenSistema = this.pedidosService.obtenerResumenSistema();
    this.calcularEstadisticasAdicionales();
  }

  // Calcular estadísticas adicionales
  calcularEstadisticasAdicionales(): void {
    if (this.estadisticasCiudades.length === 0) {
      this.estadisticasAdicionales = {
        ciudadMasPedidos: 'N/A',
        ciudadMasIngresos: 'N/A',
        promedioPedidos: '0.0'
      };
      return;
    }

    // Ciudad con más pedidos
    const ciudadMasPedidos = this.estadisticasCiudades.reduce((prev, current) => 
      (prev.total > current.total) ? prev : current
    );

    // Ciudad con más ingresos
    const ciudadMasIngresos = this.estadisticasCiudades.reduce((prev, current) => 
      (prev.ingresos > current.ingresos) ? prev : current
    );

    // Promedio de pedidos por ciudad
    const totalPedidos = this.estadisticasCiudades.reduce((sum, ciudad) => sum + ciudad.total, 0);
    const promedioPedidos = totalPedidos / this.estadisticasCiudades.length;

    this.estadisticasAdicionales = {
      ciudadMasPedidos: ciudadMasPedidos.ciudad,
      ciudadMasIngresos: ciudadMasIngresos.ciudad,
      promedioPedidos: promedioPedidos.toFixed(1)
    };
  }

  // Método público para refrescar datos desde el componente padre
  refrescarEstadisticas(): void {
    this.actualizarVista();
  }
}
