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

@Component({
  selector: 'app-apartamento-list',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './apartamento-list.component.html',
  styleUrl: './apartamento-list.component.css',
  providers: []
})
export class ApartamentoListComponent implements OnInit {
  apartamentos!: Apartamento[];
  clonedApartamentos: { [s: string]: Apartamento } = {};

  bloco: Number | undefined;
  apartamento: Number | undefined;
  morador: String | undefined;
  telefone: String | undefined;
  email: String | undefined;
  
  constructor(private apartamentoService: ApartamentoService) { }

  ngOnInit() {
    this.apartamentoService.getApartamentos().subscribe((apartamentos: Apartamento[]) => { this.apartamentos = apartamentos });
  }
  onRowEditInit(apartamento: Apartamento) {
    this.clonedApartamentos[apartamento.id as unknown as string] = { ...apartamento };
  }

  onRowEditSave(apartamento: Apartamento) {
      delete this.clonedApartamentos[apartamento.id as unknown as string];
  }

  onRowEditCancel(apartamento: Apartamento, index: number) {
    this.apartamentos[index] = this.clonedApartamentos[apartamento.id as unknown as string];
    delete this.clonedApartamentos[apartamento.id as unknown as string];
  }
}
