import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Veiculo } from '../../../models/veiculo.model';
import { VeiculoService } from '../../../services/veiculo/veiculo.service';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-veiculo',
  standalone: true,
  imports: [ButtonModule, FloatLabelModule, InputTextModule, FormsModule, InputNumberModule, ToastModule],
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css'],
  providers: [MessageService]
})
export class VeiculoComponent implements OnInit {
  veiculos!: Veiculo[];
  clonedVeiculos: { [s: string]: Veiculo } = {};

  id_apartamento: Number | undefined;
  marca: String | undefined;
  modelo: String | undefined;
  cor: String | undefined;
  placa: String | undefined;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.veiculoService.getVeiculos().subscribe((veiculos: Veiculo[]) => { this.veiculos = veiculos });
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const veiculo: Veiculo = form.value;
      this.veiculoService.saveVeiculo(veiculo).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Veiculo Criado com sucesso!' });

          setTimeout(() => {
            this.redirectToList();
          }, 2000);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao criar veiculo!' });
        }
      );
    }
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

  redirectToList(): void {
    this.router.navigate(['/veiculo']);
  }

  onRowEditCancel(veiculo: Veiculo, index: number) {
    this.veiculos[index] = this.clonedVeiculos[veiculo.id as unknown as string];
    delete this.clonedVeiculos[veiculo.id as unknown as string];
  }
}
