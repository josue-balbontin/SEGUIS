import { Component, Input, OnInit } from '@angular/core';
import { Equipos } from '../../Modulos/equipos';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from '../../Servicios/equipos/equipos.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../Servicios/carritos/carrito.service';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
   id: string = '';

  producto: Equipos = {
    id: 0,
    nombre: '',
    descripcion: '',
    link: '',
    estado: true,
    precio: 0
  };


  constructor(
    private route: ActivatedRoute,
    private servicio: EquiposService,
   private carrito: CarritoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      const equipo = this.servicio.getEquipoById(Number(this.id));
      if (equipo) {
        this.producto = equipo;
      } else {
        // Producto no encontrado, redirigir o manejar el error
        this.router.navigate(['/home']);
      }
    });
  }
 
  addproductocarrito() {
    this.carrito.agregarproducto(this.producto);
    this.router.navigate(['/home']);
  }

}
