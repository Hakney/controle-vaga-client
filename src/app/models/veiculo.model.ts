import { Apartamento } from "./apartamento.model";

export interface Veiculo {
  id: Number;
  apartamento: Apartamento;
  marca: String;
  modelo: String;
  cor: String;
  placa: String;
}