import { Component } from '@angular/core';
import { Equipos } from '../../../Modulos/equipos';
import { EquiposService } from '../../../Servicios/equipos/equipos.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-grupoequipos',
  imports: [RouterLink],
  templateUrl: './grupoequipos.component.html',
  styleUrl: './grupoequipos.component.css'
})
export class GrupoequiposComponent {


  productos: Equipos[] = [];

  constructor(private servicio: EquiposService) { 

    this.productos = this.servicio.getEquipos();

  };

  handleImageError(item: Equipos) {
    item.link = undefined; // Elimina la imagen fallida
  }

  
}
