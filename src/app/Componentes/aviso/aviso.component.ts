import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aviso',
  imports: [CommonModule],
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.css'
})
export class AvisoComponent {
  @Input() titulo: string = 'Compra Exitosa';
  @Input() mensaje: string = '¡Tu pedido ha sido procesado exitosamente!';
  @Input() subtitulo: string = 'Gracias por tu compra';

  @Output() cerrarAviso = new EventEmitter<void>();

  constructor(private router: Router) {}


  onAceptar() {

    this.router.navigate(['/home']);
  }
}
