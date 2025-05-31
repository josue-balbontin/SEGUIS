import { Injectable } from '@angular/core';
import { Equipos } from '../../Modulos/equipos'; // Adjust the path as necessary
@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private equipos: Equipos[] = [
    {
      id: 1,
      nombre: 'Soda Cola',
      descripcion: 'Soda de Cola con gas',
      marca: 'Coca-Cola',
      link: 'https://www.coca-cola.com/content/dam/onexp/bo/es/brands/coca-cola/new/coca-cola-bo.jpg/width1024.jpg',
      estado: true,
      precio: 1.5
    },
    {
      id: 2,
      nombre: 'Agua',
      descripcion: 'Agua mineral destilada con minerales',
      marca: 'Vital',
      link: 'https://img.freepik.com/vector-gratis/icono-vector-realista-botella-agua-plastico-aislado-sobre-fondo-blanco-bebida-maqueta-bebida_134830-1356.jpg?semt=ais_hybrid&w=740',
      estado: true,
      precio: 1.0
    },
    {
      id: 3,
      nombre: 'Empanadas',
      descripcion: 'Empanadas de carne con masa crujiente',
      marca: 'Caseras',
      link: 'https://easyways.cl/storage/20180601113008masa-de-empanadas.jpg',
      estado: true,
      precio: 2.5
    }
  ];

  constructor() { }

  getEquipos(): Equipos[] {
    return this.equipos;
  }

  addEquipo(nombre : string , descripcion : string , url : string ): void {
    const nuevoEquipo: Equipos = {
      id: this.equipos.length + 1,
      nombre,
      descripcion,
      link: url,
      estado: true
    };
    this.equipos.push(nuevoEquipo);
  }

  removeEquipo(equipo: Equipos): void {
    const index = this.equipos.indexOf(equipo);
    if (index > -1) {
      this.equipos.splice(index, 1);
    }
  }

  updateEquipo(equipo: Equipos, nombre: string, descripcion: string, url: string): void {
    equipo.nombre = nombre;
    equipo.descripcion = descripcion;
    equipo.link = url;
  }

  getEquipoById(id: number): Equipos | undefined {
    return this.equipos.find(equipo => equipo.id === id);
  }


}
