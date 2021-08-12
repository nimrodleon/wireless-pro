import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Client} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseURL: string = environment.baseUrl + 'clients';

  constructor(private http: HttpClient) {
  }

  getClientList(query: string): Observable<Client[]> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get<Client[]>(this.baseURL, {params});
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${id}`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseURL, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.baseURL}/${client._id}`, client);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // exportar lista de clientes.
  reporteListaDeClientes(): Observable<Blob> {
    return this.http.get(`${this.baseURL}/reporte/listaDeClientes`, {responseType: 'blob'});
  }

  // valor por defecto cliente.
  defaultValues(): Client {
    return {
      _id: undefined,
      dni: '',
      type: 'PERSONA',
      fullName: '',
      fullAddress: '',
      phone: '',
      email: '',
      note: '',
    };
  }

}
