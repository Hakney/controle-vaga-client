import { Component, OnInit } from '@angular/core';
import { Apartamento } from '../../../models/apartamento.model';
import { ApartamentoService } from '../../../services/apartamento.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-apartamento-list',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './apartamento-list.component.html',
  styleUrl: './apartamento-list.component.css',
  providers: [MessageService]
})
export class ApartamentoListComponent implements OnInit {
  apartamentos!: Apartamento[];
  clonedApartamentos: { [s: string]: Apartamento } = {};

  bloco: Number | undefined;
  apartamento: Number | undefined;
  morador: String | undefined;
  telefone: String | undefined;
  email: String | undefined;

  constructor(
    private apartamentoService: ApartamentoService, 
    private router: Router, 
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.apartamentoService.getApartamentos().subscribe((apartamentos: Apartamento[]) => { this.apartamentos = apartamentos });
  }
  onRowEditInit(apartamento: Apartamento) {
    this.clonedApartamentos[apartamento.id as unknown as string] = { ...apartamento };
  }

  onRowEditSave(apartamento: Apartamento) {
    this.apartamentoService.editApartamento(apartamento).subscribe(
      () => {
        delete this.clonedApartamentos[apartamento.id as unknown as string];
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Apartamento atualizado com sucesso!' });
      }
    );
  }

  onRowDelete(apartamento: Apartamento) {
    this.apartamentoService.deleteApartamento(apartamento.id).subscribe(
      () => {
        this.apartamentos = this.apartamentos.filter(a => a.id !== apartamento.id);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Apartamento removido com sucesso!' });

      }
    );
  }

  redirectToForm() {
    this.router.navigate(['/apartamento-new']);
  }

  onRowEditCancel(apartamento: Apartamento, index: number) {
    this.apartamentos[index] = this.clonedApartamentos[apartamento.id as unknown as string];
    delete this.clonedApartamentos[apartamento.id as unknown as string];
  }
}
