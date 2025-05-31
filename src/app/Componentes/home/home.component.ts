import { Component } from '@angular/core';
import { GrupoequiposComponent } from './grupoequipos/grupoequipos.component';

@Component({
  selector: 'app-home',
  imports: [GrupoequiposComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
