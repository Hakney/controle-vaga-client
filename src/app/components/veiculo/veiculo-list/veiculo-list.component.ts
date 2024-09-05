import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { Veiculo } from '../../../models/veiculo.model';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { Router } from '@angular/router';
import { ApartamentoService } from '../../../services/apartamento/apartamento.service';
import { Apartamento } from '../../../models/apartamento.model';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './veiculo-list.component.html',
  styleUrl: './veiculo-list.component.css',
  providers: [MessageService]
})
export class VeiculoListComponent {
  veiculos!: Veiculo[];
  clonedVeiculos: { [s: string]: Veiculo } = {};
  apartamentos: Apartamento[] = [];

  apartamentoId: Number | undefined;
  marca: String | undefined;
  modelo: String | undefined;
  cor: String | undefined;
  placa: String | undefined;

  constructor(
    private veiculoService: VeiculoService,
    private apartamentoService: ApartamentoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.veiculoService.getVeiculos().subscribe((veiculos: Veiculo[]) => { 
      this.veiculos = veiculos 
    });
    this.apartamentoService.getApartamentos().subscribe((apartamentos: Apartamento[]) => {
      this.apartamentos = apartamentos.map(apartamento => ({
        ...apartamento,
        label: `Apartamento ${apartamento?.apartamento} - Bloco ${apartamento?.bloco}`
      }));
    });

  }

  getApartamentoLabel(apartamentoId: Number): string {
    const apartamento = this.apartamentos.find(a => a.id === apartamentoId);
    return apartamento ? apartamento.label : 'N/A';
  }

  onRowEditInit(veiculo: Veiculo) {
    this.clonedVeiculos[veiculo.id as unknown as string] = { ...veiculo };
  }

  onRowEditSave(veiculo: Veiculo) {
    this.veiculoService.editVeiculo(veiculo).subscribe(
      () => {
        delete this.clonedVeiculos[veiculo.id as unknown as string];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Veículo atualizado com sucesso!' });
      }
    );
  }

  onRowDelete(veiculo: Veiculo) {
    this.veiculoService.deleteVeiculo(veiculo.id).subscribe(
      () => {
        this.veiculos = this.veiculos.filter(v => v.id !== veiculo.id);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Veículo removido com sucesso!' });
      }
    );
  }

  redirectToForm() {
    this.router.navigate(['/veiculo-new']);
  }

  onRowEditCancel(veiculo: Veiculo, index: number) {
    this.veiculos[index] = this.clonedVeiculos[veiculo.id as unknown as string];
    delete this.clonedVeiculos[veiculo.id as unknown as string];
  }

}
