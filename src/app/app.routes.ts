import { Routes } from '@angular/router';
import { ApartamentoListComponent } from './components/apartamento/apartamento-list/apartamento-list.component';
import { ApartamentoComponent } from './components/apartamento/apartamento-form/apartamento.component';
import { VeiculoComponent } from './components/veiculo/veiculo.component';

export const routes: Routes = [
    { path: 'apartamento', component: ApartamentoListComponent },
    { path: 'apartamento-new', component: ApartamentoComponent },
    { path: 'veiculo', component: VeiculoComponent }
];
