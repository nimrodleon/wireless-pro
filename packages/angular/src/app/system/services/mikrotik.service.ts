import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Mikrotik} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MikrotikService {
  private baseURL = environment.baseUrl + 'mikrotik';

  constructor(
    private http: HttpClient) {
  }

  // Lista de router mikrotik.
  getMikrotikList(): Observable<Mikrotik[]> {
    return this.http.get<Mikrotik[]>(this.baseURL);
  }

  // obtener por id.
  getMikrotikById(id: string): Observable<Mikrotik> {
    return this.http.get<Mikrotik>(`${this.baseURL}/${id}`);
  }

  // registrar.
  createMikrotik(data: Mikrotik): Observable<Mikrotik> {
    return this.http.post<Mikrotik>(this.baseURL, data);
  }

  // actualizar.
  updateMikrotik(data: Mikrotik): Observable<Mikrotik> {
    return this.http.patch<Mikrotik>(`${this.baseURL}/${data._id}`, data);
  }

  // borrar.
  deleteMikrotik(id: string): Observable<Mikrotik> {
    return this.http.delete<Mikrotik>(`${this.baseURL}/${id}`);
  }

  // valores por defecto.
  defaultValues(): Mikrotik {
    return {
      _id: undefined,
      name: '',
      host: '',
      port: 8728,
      userName: '',
      password: '',
      applicationId: '',
    };
  }

}
