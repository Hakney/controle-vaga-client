import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'apartamento',
  standalone: true,
  imports: [ButtonModule, FloatLabelModule, InputTextModule, FormsModule, InputNumberModule],
  templateUrl: './apartamento.component.html',
  styleUrl: './apartamento.component.css'
})

export class ApartamentoComponent {
  bloco: Number | undefined;
  apartamento: Number | undefined;
  morador: String | undefined;
  telefone: String | undefined;
  email: String | undefined;

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form data:', form.value);
    } else {
      console.log('Form is invalid');
    }
  }

}
