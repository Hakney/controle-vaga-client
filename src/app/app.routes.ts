import { Routes } from '@angular/router';
import { ApartamentoComponent } from './components/apartamento/apartamento-form/apartamento.component';
import { VeiculoComponent } from './components/veiculo/veiculo.component';
import { ApartamentoListComponent } from './components/apartamento/apartamento-list/apartamento-list.component';

export const routes: Routes = [
    { path: 'apartamento', component: ApartamentoListComponent },
    { path: 'veiculo', component: VeiculoComponent }
];
