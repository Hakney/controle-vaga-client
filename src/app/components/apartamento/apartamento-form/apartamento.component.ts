import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Apartamento } from '../../../models/apartamento.model'
import { ApartamentoService } from '../../../services/apartamento.service';

@Component({
  selector: 'apartamento',
  standalone: true,
  imports: [ButtonModule, FloatLabelModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './apartamento.component.html',
  styleUrl: './apartamento.component.css'
})

export class ApartamentoComponent {
  constructor(private apartamentoService: ApartamentoService) { }
  apartamentos!: Apartamento[];

  bloco: Number | undefined;
  apartamento: Number | undefined;
  morador: String | undefined;
  telefone: String | undefined;
  email: String | undefined;

  onSubmit(form: any): void {
    console.log(form.value, 'teste');
    console.log(this.apartamentos, 'apartamentos');

    if (form.valid) {
      const apartamento: Apartamento = form.value;
      this.apartamentoService.saveApartamento(apartamento).subscribe(
        (response) => {
          alert('Apartamento salvo com sucesso');
        });
    }
  }
}
