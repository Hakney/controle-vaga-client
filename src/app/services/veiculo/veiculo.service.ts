import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Veiculo } from '../../models/veiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/veiculoList`);
  }

  saveVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(`${this.apiUrl}/veiculo`, veiculo);
  }

  editVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/veiculo/${veiculo.id}`, veiculo);
  }

  deleteVeiculo(id: Number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/veiculo/${id}`);
  }
}
