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

  // Lista de aplicaciones.
  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.baseURL}/list`);
  }

  // registrar aplicación.
  createApplication(data: Application): Observable<Application> {
    return this.http.post<Application>(`${this.baseURL}/add`, data);
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
