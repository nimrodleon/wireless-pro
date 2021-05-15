import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseURL: string = environment.baseUrl + 'clients';

  constructor(private http: HttpClient) { }

  getClients(query: any, status: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('status', status);
    params = params.append('search', query.search);
    params = params.append('page', query.page);
    return this.http.get(this.baseURL, { params: params });
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseURL, client);
  }

  update(client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.baseURL}/${client._id}`, client);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

}
