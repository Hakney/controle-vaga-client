import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Apartamento } from '../models/apartamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000';

  getApartamentos(): Observable<Apartamento[]> {
    return this.http.get<Apartamento[]>(`${this.apiUrl}/apartamentoList`);
  }

  saveApartamento(apartamento: Apartamento): Observable<Apartamento> {
    return this.http.post<Apartamento>(`${this.apiUrl}/apartamento`, apartamento);
  }

  editApartamento(apartamento: Apartamento): Observable<Apartamento> {
    return this.http.put<Apartamento>(`${this.apiUrl}/apartamento/${apartamento.id}`, apartamento);
  }

  deleteApartamento(id: Number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/apartamento/${id}`);
  }
}
