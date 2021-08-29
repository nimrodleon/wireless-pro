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

  // cambiar estado del servicio.
  changeStatusService(id: string, status: string): Observable<Service> {
    return this.http.put<Service>(`${this.baseURL}/${id}/changeStatusService`, {status});
  }

  // lista de servicios temporales.
  getTemporalServices(): Observable<any> {
    return this.http.get(`${this.baseURL}/reporte/getTemporalServices`);
  }

  // reporte de servicios por cobrar.
  reporteClientesPorCobrar(date: string): Observable<any> {
    return this.http.get(`${this.baseURL}/reporte/clientesPorCobrar/${date}`);
  }

  // reporte servicios por estado.
  // reporteServiciosPorEstado(): Observable<Blob> {
  //   return this.http.get(`${this.baseURL}/reporte/serviciosPorEstado`, {responseType: 'blob'});
  // }

  // reporte servicios sin registro de pago.
  reporteServicioSinRegistroDePago(): Observable<Blob> {
    return this.http.get(`${this.baseURL}/reporte/servicioSinRegistroDePago`, {responseType: 'blob'});
  }

  // valores por defecto.
  defaultValues(): Service {
    return {
      _id: undefined,
      clientId: '',
      ipAddress: '',
      status: 'HABILITADO',
      servicePlanId: '',
      initialDate: '',
      mikrotikId: '',
      interfaceId: '',
      userName: '',
      password: '',
      basicNote: '',
      accessPoint: '',
      macAddress: '00:00:00:00:00:00',
      address: '',
      city: '',
      region: '',
      coverageId: '',
      paymentType: 'PRE',
      defPrice: false,
      price: 0,
      commonPayment: 'MENSUAL',
      paymentNote: '',
      createdAt: null
    };
  }

}
