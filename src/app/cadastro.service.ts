import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro } from './Cadastro';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  url = 'https://localhost:7112/api/Cadastros';

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(this.url);
  }

  PegarPorId(cadastroId: number): Observable<Cadastro>{
    const apiUrl = `${this.url}/${cadastroId}`;
    return this.http.get<Cadastro>(apiUrl);
  }
  SalvarPessoa(cadastro: Cadastro) : Observable<any>{
    return this.http.post<Cadastro>(this.url, cadastro, httpOptions);
  }
  AtualizarPessoa(pessoa: Cadastro) : Observable<any>{
    return this.http.put<Cadastro>(this.url, pessoa, httpOptions);
  }
  ExcluirCadastro(cadastroId: number) : Observable<any>{
    const apiUrl = `${this.url}/${cadastroId}`;
    return this.http.delete<number>(apiUrl, httpOptions);    
  }
}
