import { Routes } from '@angular/router';
import { HomeComponent } from './Componentes/home/home.component';
import { ProductoComponent } from './Componentes/producto/producto.component';
import { CarritoComponent } from './Componentes/carrito/carrito.component';
import { AdministradorComponent } from './Componentes/admin_modulo/administrador/administrador.component';

export const routes: Routes = [

{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'Objeto/:id', component: ProductoComponent },
{ path: 'Carrito', component: CarritoComponent },
{ path: 'Admin', component: AdministradorComponent },
];
