import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {Application} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseURL: string = environment.baseUrl + 'info/application';

  constructor(
    private http: HttpClient) {
  }

  // obtener aplicación por id.
  getApplicationById(appId: string): Observable<Application> {
    return this.http.get<Application>(`${this.baseURL}/${appId}/show`);
  }

  // Lista de aplicaciones.
  getApplications(): Observable<Array<Application>> {
    return this.http.get<Array<Application>>(`${this.baseURL}/list`);
  }

  // registrar aplicación.
  createApplication(data: Application): Observable<Application> {
    return this.http.post<Application>(`${this.baseURL}/add`, data);
  }

  // actualizar aplicación.
  updateApplication(appId: string, data: Application): Observable<Application> {
    return this.http.put<Application>(`${this.baseURL}/update/${appId}`, data);
  }

  // borrar aplicación.
  deleteApplication(id: string): Observable<Application> {
    return this.http.delete<Application>(`${this.baseURL}/delete/${id}`);
  }

  // Valores por defecto.
  defaultValues(): Application {
    return {
      _id: undefined,
      name: '',
      urlBase: '',
      token: ''
    };
  }

}
