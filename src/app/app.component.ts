import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApartamentoComponent } from './components/apartamento/apartamento-form/apartamento.component';
import { MenuComponent } from './components/menu/menu.component';
import { ApartamentoListComponent } from './components/apartamento/apartamento-list/apartamento-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    ApartamentoComponent, 
    ApartamentoListComponent, 
    MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'controle-vaga-client';
}
