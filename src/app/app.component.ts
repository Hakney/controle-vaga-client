import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApartamentoComponent } from './components/apartamento/apartamento.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ApartamentoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controle-vaga-client';
}
