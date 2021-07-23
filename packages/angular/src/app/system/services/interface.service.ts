import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Interface} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {
  private baseURL = environment.baseUrl + 'mikrotik';

  constructor(
    private http: HttpClient) {
  }

  // Lista de interfaces.
  getInterfaceList(id: string): Observable<Interface[]> {
    return this.http.get<Interface[]>(`${this.baseURL}/${id}/interface`);
  }

  // Obtener por id.
  getInterfaceById(id: string): Observable<Interface> {
    return this.http.get<Interface>(`${this.baseURL}/show/interface/${id}`);
  }

  // registrar.
  createInterface(data: Interface): Observable<Interface> {
    return this.http.post<Interface>(`${this.baseURL}/add/interface`, data);
  }

  // actualizar.
  updateInterface(data: Interface): Observable<Interface> {
    return this.http.patch<Interface>(`${this.baseURL}/update/interface/${data._id}`, data);
  }

  // borrar.
  deleteInterface(id: string): Observable<Interface> {
    return this.http.delete<Interface>(`${this.baseURL}/delete/interface/${id}`);
  }

  // valores por defecto.
  defaultValues(): Interface {
    return {
      _id: undefined,
      name: '',
      mikrotikId: '',
    };
  }

}
