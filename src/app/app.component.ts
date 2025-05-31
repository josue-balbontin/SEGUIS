import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Componentes/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SEGUIS';

}
