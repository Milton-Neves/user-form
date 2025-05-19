import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private readonly apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<any> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get(`${this.apiUrl}/${cepLimpo}/json/`);
  }
}
