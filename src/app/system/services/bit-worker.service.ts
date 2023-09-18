import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BitWorkerService {
  private baseURL: string = environment.baseUrl + 'bitWorker';

  constructor(private http: HttpClient) {
  }

  // cambiar estado del servicio.
  changeStatusService(serviceId: string, status: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/changeStatusService/${status}`);
  }

  // Cambiar plan de servicio.
  changeServicePlan(serviceId: string, servicePlanId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/changeServicePlan/${servicePlanId}`);
  }

  // registrar servicio en mikrotik.
  addService(serviceId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/addService`);
  }

  // actualizar plan de servicio.
  updateService(serviceId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/updateService`);
  }

  // borrar servicio del mikrotik.
  deleteService(serviceId: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/deleteService`);
  }

  // ====================================================================================================

  // Lista de estado de cambios.
  getWorkerActivities(serviceId: string, year: string): Observable<any> {
    return this.http.get(`${this.baseURL}/${serviceId}/getWorkerActivities/${year}`);
  }

  // registrar cambios de estado.
  createWorkerActivity(data: any): Observable<any> {
    return this.http.post(`${this.baseURL}/createWorkerActivity`, data);
  }

}
