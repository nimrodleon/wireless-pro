import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Service} from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseURL: string = environment.baseUrl + 'services';

  constructor(private http: HttpClient) {
  }

  getServices(id: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}/client`);
  }

  getService(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.baseURL}/${id}`);
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>(this.baseURL, service);
  }

  update(service: Service): Observable<Service> {
    return this.http.patch<Service>(`${this.baseURL}/${service._id}`, service);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  paymentsCount(id: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/${id}/payments/count`);
  }

}
