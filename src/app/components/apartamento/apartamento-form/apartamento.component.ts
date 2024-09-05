import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Apartamento } from '../../../models/apartamento.model'
import { ApartamentoService } from '../../../services/apartamento/apartamento.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'apartamento',
  standalone: true,
  imports: [ButtonModule, FloatLabelModule, InputTextModule, FormsModule, InputNumberModule, ToastModule],
  providers: [MessageService],
  templateUrl: './apartamento.component.html',
  styleUrl: './apartamento.component.css'
})

export class ApartamentoComponent {
  constructor(
    private apartamentoService: ApartamentoService,
    private messageService: MessageService,
    private router: Router
  ) { }

  apartamentos!: Apartamento[];

  bloco: Number | undefined;
  apartamento: Number | undefined;
  morador: String | undefined;
  telefone: String | undefined;
  email: String | undefined;

  onSubmit(form: any): void {
    if (form.valid) {
      const apartamento: Apartamento = form.value;
      this.apartamentoService.saveApartamento(apartamento).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Apartamento Criado com sucesso!' });

          setTimeout(() => {
            this.redirectToList();
          }, 2000);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao criar apartamento!' });
        }
      );
    }
  }

  redirectToList(): void {
    this.router.navigate(['/apartamento']);
  }
}
