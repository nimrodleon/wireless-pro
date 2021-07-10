import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Service} from '../interfaces';

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

  getServiceById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.baseURL}/${id}`);
  }

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.baseURL, service);
  }

  updateService(service: Service): Observable<Service> {
    return this.http.patch<Service>(`${this.baseURL}/${service._id}`, service);
  }

  deleteService(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  // paymentsCount(id: string): Observable<number> {
  //   return this.http.get<number>(`${this.baseURL}/${id}/payments/count`);
  // }

  // valores por defecto.
  defaultValues(): Service {
    return {
      _id: undefined,
      clientId: '',
      ipAddress: '',
      status: 'H',
      servicePlanId: '',
      initialDate: '',
      mikrotikId: '',
      ethernetId: '',
      userName: '',
      password: '',
      basicNote: '',
      accessPoint: '',
      macAddress: '',
      address: '',
      city: '',
      region: '',
      coverageId: '',
      paymentType: 'PRE',
      defPrice: false,
      price: 0,
      commonPayment: 'M',
      paymentNote: '',
      createdAt: null
    };
  }

}
