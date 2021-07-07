import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ethernet} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EthernetService {
  private baseURL = environment.baseUrl + 'mikrotik';

  constructor(
    private http: HttpClient) {
  }

  // Lista de interfaces.
  getEthernetList(id: string): Observable<Ethernet[]> {
    return this.http.get<Ethernet[]>(`${this.baseURL}/${id}/ethernet`);
  }

  // Obtener por id.
  getEthernetById(id: string): Observable<Ethernet> {
    return this.http.get<Ethernet>(`${this.baseURL}/show/ethernet/${id}`);
  }

  // registrar.
  createEthernet(data: Ethernet): Observable<Ethernet> {
    return this.http.post<Ethernet>(`${this.baseURL}/add/ethernet`, data);
  }

  // actualizar.
  updateEthernet(data: Ethernet): Observable<Ethernet> {
    return this.http.patch<Ethernet>(`${this.baseURL}/update/ethernet/${data._id}`, data);
  }

  // borrar.
  deleteEthernet(id: string): Observable<Ethernet> {
    return this.http.delete<Ethernet>(`${this.baseURL}/delete/ethernet/${id}`);
  }

  // valores por defecto.
  defaultValues(): Ethernet {
    return {
      _id: undefined,
      name: '',
      mikrotikId: '',
    };
  }

}
