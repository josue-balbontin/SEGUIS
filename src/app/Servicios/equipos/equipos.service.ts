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
    },
     {
      id: 4,
      nombre: 'Chocolate caliente',
      descripcion: 'Bebida caliente de chocolate',
      marca: 'La mejor ',
      link: 'https://www.novachef.es/media/images/chocolate-caliente-especias.jpg',
      estado: true,
      precio: 5
    },
    {
      id: 5,
      nombre: 'Café',
      descripcion: 'Café recién hecho con aroma intenso',
      marca: 'Café Orgánico',
      link: 'https://prevencionar.com/wp-content/uploads/2024/06/taza_cafe.jpg',
      estado: true,
      precio: 3
    },
    {
      id: 6,
      nombre: 'Galletas',
      descripcion: 'Galletas varias',
      marca: 'Dulces Tentaciones',
      link: 'https://veggiefestchicago.org/wp-content/uploads/2020/11/20-Blog-cookie.jpg',
      estado: true,
      precio: 2
    },
    {
      id: 7,
      nombre: 'Guñape',
      descripcion: 'Guñape de queso camba ',
      marca: 'Naranjita',
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzGDF3H3FlTy3fbnj68voUjLdE1JIWH6Tmxg&s',
      estado: true,
      precio: 1.8
    }
    


  ];

  constructor() { }

  getEquipos(): Equipos[] {
    return this.equipos;
  }

  getEquipoById(id: number): Equipos | undefined {
    return this.equipos.find(equipo => equipo.id === id);
  }


}
